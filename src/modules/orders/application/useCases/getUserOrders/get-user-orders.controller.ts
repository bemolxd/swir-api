import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController, QueryParams } from 'shared/core';

import { OrderService } from '../../services';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetUserOrdersController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('users/:senderId/orders')
  async getAllUserOrders(
    @Query() params: QueryParams,
    @Param('senderId') senderId: string,
    @Res() res: Response,
  ) {
    try {
      const orders = await this.orderService.getAllUserOrders(params, senderId);

      return this.ok(res, orders);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
