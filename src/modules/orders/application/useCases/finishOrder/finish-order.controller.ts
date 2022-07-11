import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { FinishOrderBodyDto } from './finish-order.dto';
import { FinishOrderErrors } from './finish-order.errors';
import { FinishOrderResponse } from './finish-order.use-case';

@Controller()
export class FinishOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders/:orderId/finish')
  async finishOrder(
    @Param('orderId') orderId: string,
    @Body() dto: FinishOrderBodyDto,
    @Res() res: Response,
  ) {
    try {
      const result: FinishOrderResponse = await this.orderService.finishOrder({
        orderId,
        techComment: dto.techComment,
      });

      if (result instanceof FinishOrderErrors.OrderNotFound) {
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
