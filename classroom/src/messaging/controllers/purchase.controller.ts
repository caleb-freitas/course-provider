import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "../../services/courses.service";
import { EnrollmentsService } from "../../services/enrollments.service";
import { StudentsService } from "../../services/students.service";

export type Customer = {
  authUserId: string;
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
    const authUserId = payload.customer.authUserId
    const slug = payload.product.slug
    const title = payload.product.title
    let student = await this.studentsService.getStudentByauthUserId(
      authUserId
    )
    if (!student) {
      student = await this.studentsService.createStudent(
        authUserId
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
