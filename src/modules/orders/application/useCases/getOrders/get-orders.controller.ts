import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { OrdersCollectionQueryParams } from 'modules/orders/adapter';
import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { OrdersCollectionDto } from '../../dto';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetOrdersController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('orders')
  @ApiOkResponse({ type: OrdersCollectionDto })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'order', type: 'string', required: false })
  @ApiQuery({ name: 'senderId', type: 'string', required: false })
  @ApiQuery({ name: 'techId', type: 'string', required: false })
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH)
  async getAllOrders(
    @Query() params: OrdersCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const orders = await this.orderService.getActiveOrders(params);

      return this.ok(res, orders);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
