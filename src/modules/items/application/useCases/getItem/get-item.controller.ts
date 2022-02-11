import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AppError } from 'shared/core';

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
      return new HttpException(new AppError.UnexpectedError(error), 500);
    }
  }
}
