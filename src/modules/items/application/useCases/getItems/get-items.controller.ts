import { Controller, Get } from '@nestjs/common';

import { ItemService } from '../../services';

@Controller()
export class GetItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items')
  async getAllItems() {
    const items = this.itemService.getAllItems();

    return items;
  }
}
