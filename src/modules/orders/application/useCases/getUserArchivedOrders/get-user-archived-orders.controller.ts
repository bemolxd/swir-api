import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { Response } from 'express';
import { AppError, BaseController } from 'shared/core';

import { OrdersCollectionQueryParams } from 'modules/orders/adapter';
import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetUserArchivedOrdersController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('/users/:userId/archived-orders')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  async getUserArchivedOrders(
    @Query() params: OrdersCollectionQueryParams,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const archivedOrders = await this.orderService.getUserArchivedOrders({
        ...params,
        senderId: userId,
      });

      return this.ok(res, archivedOrders);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
