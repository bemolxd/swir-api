import {
  Controller,
  Delete,
  HttpException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError } from 'shared/core';

import { ItemService } from '../../services';
import { RemoveItemErrors } from './remove-item.errors';
import { RemoveItemResponse } from './remove-item.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class RemoveItemController {
  constructor(private readonly itemService: ItemService) {}

  @Delete('items/:itemId')
  async removeItem(@Param('itemId') itemId: string) {
    try {
      const result: RemoveItemResponse = await this.itemService.removeItem({
        itemId,
      });

      if (result instanceof RemoveItemErrors.ItemNotFoundError) {
        return new NotFoundException(result.message);
      }

      return;
    } catch (error) {
      return new HttpException(new AppError.UnexpectedError(error), 500);
    }
  }
}
