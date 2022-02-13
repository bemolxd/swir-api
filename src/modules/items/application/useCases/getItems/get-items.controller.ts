import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError } from 'shared/core';

import { ItemsCollectionQueryParams } from 'modules/items/adapter';

import { ItemService } from '../../services';

@Controller()
@UseGuards(AuthenticatedGuard)
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
