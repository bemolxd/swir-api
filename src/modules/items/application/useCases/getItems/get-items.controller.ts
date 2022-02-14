import {
  Controller,
  Get,
  HttpException,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ItemsCollectionQueryParams } from 'modules/items/adapter';

import { ItemService } from '../../services';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetItemsController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Get('items')
  async getAllItems(
    @Query() params: ItemsCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const items = await this.itemService.getAllItems(params);

      return this.ok(res, items);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
