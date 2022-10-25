import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
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

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetArchivedOrdersController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('/archived-orders')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  async getArchivedOrders(
    @Query() params: OrdersCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const archivedOrders = await this.orderService.getArchivedOrders(params);

      return this.ok(res, archivedOrders);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
