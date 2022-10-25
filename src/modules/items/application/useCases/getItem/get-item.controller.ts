import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
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
import { GetItemErrors } from './get-item.errors';
import { GetItemResponse } from './get-item.use-case';
import { ItemDto } from '../../dto';

@ApiTags('Items')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetItemController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Get('items/:itemId')
  @ApiOkResponse({ type: ItemDto })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
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
