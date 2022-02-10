import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemRepository } from './adapter';

import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';

import { ItemService } from './application/services';

import {
  CreateItemUseCase,
  CreateItemController,
} from './application/useCases/createItem';
import {
  GetItemUseCase,
  GetItemController,
} from './application/useCases/getItem';
import {
  GetItemsController,
  GetItemsUseCase,
} from './application/useCases/getItems';
import {
  RemoveItemController,
  RemoveItemUseCase,
} from './application/useCases/removeItem';
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
    RemoveItemController,
  ],
  providers: [
    ItemService,
    ...QueryHandlers,
    ...CommandHandlers,
    GetItemUseCase,
    GetItemsUseCase,
    CreateItemUseCase,
    UpdateItemUseCase,
    RemoveItemUseCase,
  ],
})
export class ItemsModule {}
