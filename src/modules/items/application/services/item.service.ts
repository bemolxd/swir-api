import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateItemCommand } from '../commands/implementations';
import { GetItemQuery, GetItemsQuery } from '../queries/implementations';

import { CreateItemDto } from '../useCases/createItem';
import { GetItemDto } from '../useCases/getItem';

@Injectable()
export class ItemService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllItems() {
    return this.queryBus.execute(new GetItemsQuery());
  }

  async getItemById(getItemDto: GetItemDto) {
    return this.queryBus.execute(new GetItemQuery(getItemDto));
  }

  async createItem(createItemDto: CreateItemDto) {
    return this.commandBus.execute(new CreateItemCommand(createItemDto));
  }
}
