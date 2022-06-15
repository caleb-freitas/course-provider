import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "../../services/courses.service";
import { EnrollmentsService } from "../../services/enrollments.service";
import { StudentsService } from "../../services/students.service";

export type Customer = {
  authCustomerId: string;
}

export type Product = {
  id: string;
  title: string;
  slug: string;
}

export type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService
  ) {}

  @EventPattern('purchase.purchase-created')
  async purchaseCreated(
    @Payload('value')
    payload: PurchaseCreatedPayload
  ) {
    const authStudentId = payload.customer.authCustomerId
    const slug = payload.product.slug
    const title = payload.product.title
    let student = await this.studentsService.getStudentByAuthStudentId(
      authStudentId
    )
    if (!student) {
      student = await this.studentsService.createStudent(
        authStudentId
      )
    }
    let course = await this.coursesService.getCourseBySlug(slug)
    if (!course) {
      course = await this.coursesService.createCourse(title)
    }
    await this.enrollmentsService.createEnrollment(
      course.id,
      student.id
    )
  }
}
