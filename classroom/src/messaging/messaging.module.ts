import { Module } from '@nestjs/common';
import { PurchaseController } from './controllers/purchase.controller';

@Module({
  controllers: [PurchaseController]
})
export class MessagingModule {}
