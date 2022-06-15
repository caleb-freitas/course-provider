import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import slugify from 'slugify'

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async createCourse(title: string, slug?: string) {
    const courseSlug = slug ?? slugify(title, { lower: true })
    const course = await this.prisma.course.findUnique({
      where: {
        slug: courseSlug
      }
    })
    if (course) {
      throw new Error('Course already exits')
    }
    return await this.prisma.course.create({
      data: {
        title,
        slug: courseSlug
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

  async getCourseBySlug(slug: string) {
    return await this.prisma.course.findUnique({
      where: {
        slug
      }
    })
  }
}
