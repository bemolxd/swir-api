import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ItemsCollectionQueryParams } from 'modules/items/adapter';

import {
  CreateItemCommand,
  RemoveItemCommand,
  UpdateItemCommand,
} from '../commands/implementations';
import { GetItemQuery, GetItemsQuery } from '../queries/implementations';

import { CreateItemDto } from '../useCases/createItem';
import { GetItemDto } from '../useCases/getItem';
import { RemoveItemDto } from '../useCases/removeItem';
import { UpdateItemDto } from '../useCases/updateItem';

@Injectable()
export class ItemService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllItems(params: ItemsCollectionQueryParams) {
    return this.queryBus.execute(new GetItemsQuery(params));
  }

  async getItemById(getItemDto: GetItemDto) {
    return this.queryBus.execute(new GetItemQuery(getItemDto));
  }

  async createItem(createItemDto: CreateItemDto) {
    return this.commandBus.execute(new CreateItemCommand(createItemDto));
  }

  async updateItem(updateItemDto: UpdateItemDto) {
    return this.commandBus.execute(new UpdateItemCommand(updateItemDto));
  }

  async removeItem(removeItemDto: RemoveItemDto) {
    return this.commandBus.execute(new RemoveItemCommand(removeItemDto));
  }
}
