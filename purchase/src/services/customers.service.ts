import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(authUserId: string) {
    return await this.prisma.customer.create({
      data: {
        authUserId
      }
    })
  }

  async getCustomerByauthUserId(authUserId: string) {
    return await this.prisma.customer.findUnique({
      where: {
        authUserId
      },
    });
  }
}
