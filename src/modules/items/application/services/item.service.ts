import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateItemCommand } from '../commands/implementations';

import { GetItemsQuery } from '../queries/implementations';
import { CreateItemDto } from '../useCases/createItem';

@Injectable()
export class ItemService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllItems() {
    return this.queryBus.execute(new GetItemsQuery());
  }

  async createItem(createItemDto: CreateItemDto) {
    return this.commandBus.execute(new CreateItemCommand(createItemDto));
  }
}
