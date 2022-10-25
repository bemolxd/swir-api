import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { ItemService } from '../../services';
import { CreateItemDto } from './create-item.dto';
import { CreateItemErrors } from './create-item.errors';
import { CreateItemResponse } from './create-item.use-case';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class CreateItemController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Post('items')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH)
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
