import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current.user';
import { CreatePurchaseInput } from '../inputs/create.purchase';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customerService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(
    @Parent()
    purchase: Purchase,
  ) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data')
    data: CreatePurchaseInput,
    @CurrentUser()
    user: AuthUser,
  ) {
    let customer = await this.customerService.getCustomerByauthUserId(user.sub)
    if (!customer) {
      customer = await this.customerService.createCustomer(user.sub)
    }
    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId: data.productId
    })
  }
}
