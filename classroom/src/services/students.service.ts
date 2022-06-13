import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async listAllStudents() {
    return await this.prisma.student.findMany()
  }

  async getStudentByAuthStudentId(authStudentId: string) {
    return await this.prisma.student.findUnique({
      where: {
        authStudentId
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
}
