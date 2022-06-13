import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CreatePurchaseParams = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async createPurchase(purchaseParams: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: purchaseParams.productId,
      },
    });
    if (!product) {
      throw new Error('Product not founded');
    }
    return await this.prisma.purchase.create({
      data: {
        ...purchaseParams,
      },
    });
  }

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
