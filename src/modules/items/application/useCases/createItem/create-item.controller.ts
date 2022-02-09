import { Body, Controller, Post } from '@nestjs/common';

import { ItemService } from '../../services';
import { CreateItemDto } from './create-item.dto';

@Controller()
export class CreateItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('items')
  async createItem(@Body() createItemDto: CreateItemDto) {
    const newItem = await this.itemService.createItem(createItemDto);

    return newItem;
  }
}
