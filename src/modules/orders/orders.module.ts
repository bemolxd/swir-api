import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderRepository } from './adapter';

import { QueryHandlers } from './application/queries/handlers';

import { OrderService } from './application/services';

import { GetOrderUseCase } from './application/useCases/getOrder';

import {
  GetOrdersController,
  GetOrdersUseCase,
} from './application/useCases/getOrders';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [GetOrdersController],
  providers: [
    OrderService,
    ...QueryHandlers,
    GetOrdersUseCase,
    GetOrderUseCase,
  ],
})
export class OrdersModule {}
