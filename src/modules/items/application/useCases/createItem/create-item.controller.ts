import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ItemService } from '../../services';
import { CreateItemDto } from './create-item.dto';
import { CreateItemErrors } from './create-item.errors';
import { CreateItemResponse } from './create-item.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class CreateItemController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Post('items')
  async createItem(@Body() createItemDto: CreateItemDto, @Res() res: Response) {
    try {
      const result: CreateItemResponse = await this.itemService.createItem(
        createItemDto,
      );

      if (result instanceof CreateItemErrors.ItemAlreadyExists) {
        return this.badRequest(res, result);
      }

      return this.created(res);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
