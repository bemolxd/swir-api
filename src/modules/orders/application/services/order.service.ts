import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { QueryParams } from 'shared/core';

import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

import {
  GetOrderQuery,
  GetOrdersQuery,
  GetUserOrdersQuery,
} from '../queries/implementations';
import {
  AddItemElementCommand,
  CreateOrderCommand,
  DeleteOrderCommand,
  RemoveItemElementCommand,
  SubmitOrderCommand,
  RejectOrderCommand,
  AcceptOrderCommand,
  FinishOrderCommand,
} from '../commands/implementations';

import { GetOrderDto } from '../useCases/getOrder';
import { CreateOrderDto } from '../useCases/createOrder';
import { AddItemElementDto } from '../useCases/addItemElement';
import { RemoveItemElementDto } from '../useCases/removeItemElement';
import { DeleteOrderDto } from '../useCases/deleteOrder';
import { SubmitOrderDto } from '../useCases/submitOrder';
import { RejectOrderDto } from '../useCases/rejectOrder';
import { AcceptOrderDto } from '../useCases/acceptOrder';
import { FinishOrderDto } from '../useCases/finishOrder';

@Injectable()
export class OrderService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllOrders(params: OrdersCollectionQueryParams) {
    return this.queryBus.execute(new GetOrdersQuery(params));
  }

  async getAllUserOrders(params: QueryParams, senderId: string) {
    return this.queryBus.execute(new GetUserOrdersQuery(params, senderId));
  }

  async getOrderById(getOrderDto: GetOrderDto) {
    return this.queryBus.execute(new GetOrderQuery(getOrderDto));
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(createOrderDto));
  }

  async addItemElement(addItemElementDto: AddItemElementDto, orderId: string) {
    return this.commandBus.execute(
      new AddItemElementCommand(addItemElementDto, orderId),
    );
  }

  async removeItemElement(
    removeItemElementDto: RemoveItemElementDto,
    orderId: string,
  ) {
    return this.commandBus.execute(
      new RemoveItemElementCommand(removeItemElementDto, orderId),
    );
  }

  async deleteOrder(deleteOrderDto: DeleteOrderDto) {
    return this.commandBus.execute(new DeleteOrderCommand(deleteOrderDto));
  }

  async submitOrder(submitOrderDto: SubmitOrderDto) {
    return this.commandBus.execute(new SubmitOrderCommand(submitOrderDto));
  }

  async rejectOrder(rejectOrderDto: RejectOrderDto) {
    return this.commandBus.execute(new RejectOrderCommand(rejectOrderDto));
  }

  async acceptOrder(acceptOrderDto: AcceptOrderDto) {
    return this.commandBus.execute(new AcceptOrderCommand(acceptOrderDto));
  }

  async finishOrder(finishOrderDto: FinishOrderDto) {
    return this.commandBus.execute(new FinishOrderCommand(finishOrderDto));
  }
}
