import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemRepository } from './adapter';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { ItemService } from './application/services';
import { CreateItemUseCase } from './application/useCases/createItem';
import { CreateItemController } from './application/useCases/createItem/create-item.controller';
import {
  GetItemsController,
  GetItemsUseCase,
} from './application/useCases/getItems';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ItemRepository])],
  controllers: [GetItemsController, CreateItemController],
  providers: [
    ItemService,
    ...QueryHandlers,
    ...CommandHandlers,
    GetItemsUseCase,
    CreateItemUseCase,
  ],
})
export class ItemsModule {}
