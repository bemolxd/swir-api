import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

import { OrderService } from '../../services';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetOrdersController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('orders')
  async getAllOrders(
    @Query() params: OrdersCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const orders = await this.orderService.getAllOrders(params);

      return this.ok(res, orders);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
