import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

import { GetOrderQuery, GetOrdersQuery } from '../queries/implementations';

import { GetOrderDto } from '../useCases/getOrder';

@Injectable()
export class OrderService {
  constructor(private readonly queryBus: QueryBus) {}

  async getAllOrders(params: OrdersCollectionQueryParams) {
    return this.queryBus.execute(new GetOrdersQuery(params));
  }

  async getOrderById(getOrderDto: GetOrderDto) {
    return this.queryBus.execute(new GetOrderQuery(getOrderDto));
  }
}
