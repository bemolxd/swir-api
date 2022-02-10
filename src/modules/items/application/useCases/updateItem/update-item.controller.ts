import { Body, Controller, Param, Put } from '@nestjs/common';

import { ItemService } from '../../services';
import { CreateItemDto } from '../createItem';

@Controller()
export class UpdateItemController {
  constructor(private readonly itemService: ItemService) {}

  @Put('items/:itemId')
  async updateItem(
    @Param('itemId') itemId: string,
    @Body() itemBodyDto: CreateItemDto,
  ) {
    const updatedItem = await this.itemService.updateItem({
      itemId,
      ...itemBodyDto,
    });

    return updatedItem;
  }
}
