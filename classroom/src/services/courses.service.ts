import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import slugify from 'slugify'

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async createCourse(title: string) {
    const slug = slugify(title, { lower: true })
    const course = await this.prisma.course.findUnique({
      where: {
        slug
      }
    })
    if (course) {
      throw new Error('Course already exits')
    }
    return await this.prisma.course.create({
      data: {
        title,
        slug
      }
    })
  }


  async listAllCourses() {
    return await this.prisma.course.findMany()
  }

  async getCourseById(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id
      }
    })
  }
}
