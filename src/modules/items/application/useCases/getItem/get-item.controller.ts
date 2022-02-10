import { Controller, Get, Param } from '@nestjs/common';
import { ItemService } from '../../services';

@Controller()
export class GetItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items/:itemId')
  async getItemById(@Param('itemId') itemId: string) {
    const item = await this.itemService.getItemById({ itemId });

    return item;
  }
}
