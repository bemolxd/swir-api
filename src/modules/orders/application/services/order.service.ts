import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

import { GetOrdersQuery } from '../queries/implementations';

@Injectable()
export class OrderService {
  constructor(private readonly queryBus: QueryBus) {}

  async getAllOrders(params: OrdersCollectionQueryParams) {
    return this.queryBus.execute(new GetOrdersQuery(params));
  }
}
