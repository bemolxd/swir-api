import { Controller, Get, Query } from '@nestjs/common';
import { ItemsCollectionQueryParams } from 'modules/items/adapter';

import { ItemService } from '../../services';

@Controller()
export class GetItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items')
  async getAllItems(@Query() params: ItemsCollectionQueryParams) {
    const items = this.itemService.getAllItems(params);

    return items;
  }
}
