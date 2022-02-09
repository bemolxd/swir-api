import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemRepository } from './adapter';
import { QueryHandlers } from './application/queries/handlers';
import { ItemService } from './application/services';
import {
  GetItemsController,
  GetItemsUseCase,
} from './application/useCases/getItems';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ItemRepository])],
  controllers: [GetItemsController],
  providers: [ItemService, ...QueryHandlers, GetItemsUseCase],
})
export class ItemsModule {}
