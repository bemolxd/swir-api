import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';

import {
  OrderMap,
  OrderRepository,
  OrdersCollectionQueryParams,
} from 'modules/orders/adapter';

import { OrdersCollectionDto } from '../../dto';

export class GetUserArchivedOrdersUseCase
  implements UseCase<undefined, OrdersCollectionDto>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(
    params: OrdersCollectionQueryParams,
  ): Promise<OrdersCollectionDto> {
    const archivedOrders = await this.orderRepository.getAllOrders(
      params,
      true,
    );

    return {
      collection: OrderMap.toDtoBulk(archivedOrders.collection),
      meta: archivedOrders.meta,
    };
  }
}
