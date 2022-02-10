import { Controller, Delete, Param } from '@nestjs/common';

import { ItemService } from '../../services';

@Controller()
export class RemoveItemController {
  constructor(private readonly itemService: ItemService) {}

  @Delete('items/:itemId')
  async removeItem(@Param('itemId') itemId: string) {
    await this.itemService.removeItem({ itemId });

    return;
  }
}
