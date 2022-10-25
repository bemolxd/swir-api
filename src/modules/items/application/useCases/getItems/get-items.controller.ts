import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ItemsCollectionQueryParams } from 'modules/items/adapter';
import { ContextType } from 'modules/users/domain/types';
import { ItemCategory, ItemType } from 'modules/items/domain/types';

import { ItemService } from '../../services';
import { ItemsCollectionDto } from '../../dto';

@ApiTags('Items')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetItemsController extends BaseController {
  constructor(private readonly itemService: ItemService) {
    super();
  }

  @Get('items')
  @ApiOkResponse({ type: ItemsCollectionDto })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'order', type: 'string', required: false })
  @ApiQuery({ name: 'type', enum: ItemType, required: false })
  @ApiQuery({ name: 'category', enum: ItemCategory, required: false })
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
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
