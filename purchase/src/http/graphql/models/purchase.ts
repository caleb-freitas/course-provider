import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './products';

enum PurchaseStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Failed = 'Failed',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase statuses',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field()
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  productId: string;
}
