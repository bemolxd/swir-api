import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderRepository } from './adapter';

import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';

import { OrderService } from './application/services';

import { OrderControllers, OrderUseCases } from './application/useCases';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [...OrderControllers],
  providers: [
    OrderService,
    ...QueryHandlers,
    ...CommandHandlers,
    ...OrderUseCases,
  ],
})
export class OrdersModule {}
