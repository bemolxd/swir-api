import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { ItemService } from '../../services';
import { GetItemErrors } from './get-item.errors';
import { GetItemResponse } from './get-item.use-case';

@Controller()
export class GetItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items/:itemId')
  async getItemById(@Param('itemId') itemId: string) {
    try {
      const result: GetItemResponse = await this.itemService.getItemById({
        itemId,
      });

      if (result instanceof GetItemErrors.ItemNotFoundError) {
        return new NotFoundException(result.message);
      }

      return result;
    } catch (error) {
      // TODO: AppError
      console.log(error);
    }
  }
}
