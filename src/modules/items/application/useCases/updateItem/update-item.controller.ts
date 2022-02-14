import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ItemService } from '../../services';
import { CreateItemDto } from '../createItem';
import { UpdateItemErrors } from './update-item.errors';
import { UpdateItemResponse } from './update-item.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class UpdateItemController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Put('items/:itemId')
  async updateItem(
    @Param('itemId') itemId: string,
    @Body() itemBodyDto: CreateItemDto,
    @Res() res: Response,
  ) {
    try {
      const result: UpdateItemResponse = await this.itemService.updateItem({
        itemId,
        ...itemBodyDto,
      });

      if (result instanceof UpdateItemErrors.ItemNotFoundError) {
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
