import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { RejectOrderErrors } from './reject-order.errors';
import { RejectOrderResponse } from './reject-order.use-case';

@Controller()
export class RejectOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders/:orderId/reject')
  async rejectOrder(
    @Param('orderId') orderId: string,
    @Body() techComment: string,
    @Res() res: Response,
  ) {
    try {
      const result: RejectOrderResponse = await this.orderService.rejectOrder({
        orderId,
        techComment,
      });

      if (result instanceof RejectOrderErrors.OrderNotFound) {
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
