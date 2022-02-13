import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { AppError } from 'shared/core';

import { ItemsCollectionQueryParams } from 'modules/items/adapter';

import { ItemService } from '../../services';

@Controller()
export class GetItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Get('items')
  async getAllItems(@Query() params: ItemsCollectionQueryParams) {
    try {
      const items = await this.itemService.getAllItems(params);

      return items;
    } catch (error) {
      return new HttpException(new AppError.UnexpectedError(error), 500);
    }
  }
}
