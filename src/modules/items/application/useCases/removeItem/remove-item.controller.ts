import { Controller, Delete, Param, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { ItemService } from '../../services';
import { RemoveItemErrors } from './remove-item.errors';
import { RemoveItemResponse } from './remove-item.use-case';

@ApiTags('Items')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class RemoveItemController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Delete('items/:itemId')
  @ApiOkResponse({ description: 'Item removed' })
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH)
  async removeItem(@Param('itemId') itemId: string, @Res() res: Response) {
    try {
      const result: RemoveItemResponse = await this.itemService.removeItem({
        itemId,
      });

      if (result instanceof RemoveItemErrors.ItemNotFoundError) {
        return this.badRequest(res, result);
      }

      return this.ok(res);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
