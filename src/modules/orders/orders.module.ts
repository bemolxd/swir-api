import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderRepository } from './adapter';

import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';

import { OrderService } from './application/services';

import { GetOrderUseCase } from './application/useCases/getOrder';
import { GetOrderController } from './application/useCases/getOrder/get-order.controller';

import {
  GetOrdersController,
  GetOrdersUseCase,
} from './application/useCases/getOrders';

import {
  CreateOrderController,
  CreateOrderUseCase,
} from './application/useCases/createOrder';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [GetOrdersController, GetOrderController, CreateOrderController],
  providers: [
    OrderService,
    ...QueryHandlers,
    ...CommandHandlers,
    GetOrdersUseCase,
    GetOrderUseCase,
    CreateOrderUseCase,
  ],
})
export class OrdersModule {}
