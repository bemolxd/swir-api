import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetItemsQuery } from '../queries/implementations';

@Injectable()
export class ItemService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getAllItems() {
    return this.queryBus.execute(new GetItemsQuery());
  }
}
