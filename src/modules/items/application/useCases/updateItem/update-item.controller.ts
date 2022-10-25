import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { ItemService } from '../../services';
import { CreateItemDto } from '../createItem';
import { UpdateItemErrors } from './update-item.errors';
import { UpdateItemResponse } from './update-item.use-case';
import { ItemDto } from '../../dto';

@ApiTags('Items')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class UpdateItemController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Put('items/:itemId')
  @ApiOkResponse({ type: ItemDto })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH)
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
