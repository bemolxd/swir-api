import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';

import {
  OrderMap,
  OrderRepository,
  OrdersCollectionQueryParams,
} from 'modules/orders/adapter';

import { OrdersCollectionDto } from '../../dto';

export class GetUserDetailOrdersUseCase
  implements UseCase<undefined, OrdersCollectionDto>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(
    params: OrdersCollectionQueryParams,
  ): Promise<OrdersCollectionDto> {
    const orders = await this.orderRepository.getUserDetailOrders(params);

    return {
      collection: OrderMap.toDtoBulk(orders.collection),
      meta: orders.meta,
    };
  }
}
