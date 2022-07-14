import { InjectRepository } from '@nestjs/typeorm';

import { QueryParams, UseCase } from 'shared/core';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';

import { OrdersCollectionDto } from '../../dto';

export class GetUserOrdersUseCase
  implements UseCase<undefined, OrdersCollectionDto>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(
    params: QueryParams,
    senderId: string,
  ): Promise<OrdersCollectionDto> {
    const orders = await this.orderRepository.getAllOrders(params, senderId);

    return {
      collection: OrderMap.toDtoBulk(orders.collection),
      meta: orders.meta,
    };
  }
}
