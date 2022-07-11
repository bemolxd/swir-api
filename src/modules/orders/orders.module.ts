import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderRepository } from './adapter';

import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';

import { OrderService } from './application/services';

import {
  GetOrderUseCase,
  GetOrderController,
} from './application/useCases/getOrder';
import {
  GetOrdersController,
  GetOrdersUseCase,
} from './application/useCases/getOrders';
import {
  CreateOrderController,
  CreateOrderUseCase,
} from './application/useCases/createOrder';
import {
  GetUserOrdersController,
  GetUserOrdersUseCase,
} from './application/useCases/getUserOrders';
import {
  AddItemElementController,
  AddItemElementUseCase,
} from './application/useCases/addItemElement';
import {
  RemoveItemElementController,
  RemoveItemElementUseCase,
} from './application/useCases/removeItemElement';
import {
  DeleteOrderController,
  DeleteOrderUseCase,
} from './application/useCases/deleteOrder';
import { SubmitOrderUseCase } from './application/useCases/submitOrder';
import { SubmitOrderController } from './application/useCases/submitOrder/submit-order.controller';
import {
  RejectOrderController,
  RejectOrderUseCase,
} from './application/useCases/rejectOrder';
import {
  AcceptOrderController,
  AcceptOrderUseCase,
} from './application/useCases/acceptOrder';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [
    GetOrdersController,
    GetOrderController,
    CreateOrderController,
    GetUserOrdersController,
    AddItemElementController,
    RemoveItemElementController,
    DeleteOrderController,
    SubmitOrderController,
    RejectOrderController,
    AcceptOrderController,
  ],
  providers: [
    OrderService,
    ...QueryHandlers,
    ...CommandHandlers,
    GetOrdersUseCase,
    GetOrderUseCase,
    CreateOrderUseCase,
    GetUserOrdersUseCase,
    AddItemElementUseCase,
    RemoveItemElementUseCase,
    DeleteOrderUseCase,
    SubmitOrderUseCase,
    RejectOrderUseCase,
    AcceptOrderUseCase,
  ],
})
export class OrdersModule {}
