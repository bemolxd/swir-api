import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { Response } from 'express';
import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { GetOrderErrors } from './get-order.errors';
import { GetOrderResponse } from './get-order.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('orders/:orderId')
  async getOrderById(@Param('orderId') orderId: string, @Res() res: Response) {
    try {
      const result: GetOrderResponse = await this.orderService.getOrderById({
        orderId,
      });

      if (result instanceof GetOrderErrors.OrderNotFoundError) {
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
