import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(authCustomerId: string) {
    return await this.prisma.customer.create({
      data: {
        authCustomerId
      }
    })
  }

  async getCustomerByAuthCustomerId(authCustomerId: string) {
    return await this.prisma.customer.findUnique({
      where: {
        authCustomerId
      },
    });
  }
}
