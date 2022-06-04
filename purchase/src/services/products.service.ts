import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateProductParams = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return await this.prisma.product.findMany();
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });
    const slugAlreadyExits = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (slugAlreadyExits) {
      throw new Error('Another product with the same slug already exists');
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
