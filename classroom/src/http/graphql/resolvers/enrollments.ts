import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Course } from "../models/course";
import { Enrollment } from "../models/enrollment";

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesServices: CoursesService,
    private studentsService: StudentsService
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments()
  }

  @ResolveField()
  student(
    @Parent()
    enrollment: Enrollment
  ) {
    return this.studentsService.getStudentById(enrollment.id)
  }

  @ResolveField()
  course(
    @Parent()
    enrollment: Enrollment
  ) {
    return this.coursesServices.getCourseById(enrollment.courseId)
  }
}
