import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async listAllStudents() {
    return await this.prisma.student.findMany()
  }

  async getStudentByauthUserId(authUserId: string) {
    return await this.prisma.student.findUnique({
      where: {
        authUserId
      }
    })
  }

  async getStudentById(id: string) {
    return await this.prisma.student.findUnique({
      where: {
        id
      }
    })
  }

  async createStudent(authUserId: string) {
    return await this.prisma.student.create({
      data: {
        authUserId
      }
    })
  }
}
