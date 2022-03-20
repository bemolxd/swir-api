import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

import { GetOrderQuery, GetOrdersQuery } from '../queries/implementations';

import { GetOrderDto } from '../useCases/getOrder';
import { CreateOrderDto } from '../useCases/createOrder';
import { CreateOrderCommand } from '../commands/implementations';

@Injectable()
export class OrderService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllOrders(params: OrdersCollectionQueryParams) {
    return this.queryBus.execute(new GetOrdersQuery(params));
  }

  async getOrderById(getOrderDto: GetOrderDto) {
    return this.queryBus.execute(new GetOrderQuery(getOrderDto));
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(createOrderDto));
  }
}
