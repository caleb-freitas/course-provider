import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

type GetByCourseAndStudentIdParams = {
  courseId: string
  studentId: string
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async listAllEnrollments() {
    return await this.prisma.enrollment.findMany({
      where: {
        canceledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async listEnrollmentsByStudent(studentId: string) {
    return await this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async getByCourseAndStudentId({ courseId, studentId }: GetByCourseAndStudentIdParams) {
    return await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null
      }
    })
  }

  async createEnrollment(courseId: string, studentId: string) {
    return await this.prisma.enrollment.create({
      data: {
        courseId,
        studentId
      }
    })
  }
}
