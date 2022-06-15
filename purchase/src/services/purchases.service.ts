import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';

type CreatePurchaseParams = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private kafkaService: KafkaService
  ) {}

  async createPurchase(purchaseParams: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: purchaseParams.productId,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    const purchase = await this.prisma.purchase.create({
      data: {
        ...purchaseParams,
      },
    });
    const customer = await this.prisma.customer.findUnique({
      where: { id: purchaseParams.customerId }
    })
    this.kafkaService.emit('purchase.purchase-created', {
      customer: {
        authCustomerId: customer.authCustomerId
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug
      }
    })
    return purchase
  }

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllFromCustomer(customerId: string) {
    const purchase = await this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
    return purchase
  }
}
