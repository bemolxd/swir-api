import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ItemService } from '../../services';
import { GetItemErrors } from './get-item.errors';
import { GetItemResponse } from './get-item.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetItemController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Get('items/:itemId')
  async getItemById(@Param('itemId') itemId: string, @Res() res: Response) {
    try {
      const result: GetItemResponse = await this.itemService.getItemById({
        itemId,
      });

      if (result instanceof GetItemErrors.ItemNotFoundError) {
        return this.notFound(res, result);
      }

      return this.ok(res, result);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
