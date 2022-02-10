import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemRepository } from './adapter';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { ItemService } from './application/services';
import { CreateItemUseCase } from './application/useCases/createItem';
import { CreateItemController } from './application/useCases/createItem';
import { GetItemUseCase } from './application/useCases/getItem';
import { GetItemController } from './application/useCases/getItem/get-item.controller';
import {
  GetItemsController,
  GetItemsUseCase,
} from './application/useCases/getItems';
import {
  UpdateItemUseCase,
  UpdateItemController,
} from './application/useCases/updateItem';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ItemRepository])],
  controllers: [
    GetItemsController,
    CreateItemController,
    GetItemController,
    UpdateItemController,
  ],
  providers: [
    ItemService,
    ...QueryHandlers,
    ...CommandHandlers,
    GetItemUseCase,
    GetItemsUseCase,
    CreateItemUseCase,
    UpdateItemUseCase,
  ],
})
export class ItemsModule {}
