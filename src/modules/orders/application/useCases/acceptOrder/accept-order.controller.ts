import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { Response } from 'express';
import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { AcceptOrderBodyDto } from './accept-order.dto';
import { AcceptOrderErrors } from './accept-order.errors';
import { AcceptOrderResponse } from './accept-order.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class AcceptOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders/:orderId/accept')
  async acceptOrder(
    @Param('orderId') orderId: string,
    @Body() dto: AcceptOrderBodyDto,
    @Res() res: Response,
  ) {
    try {
      const result: AcceptOrderResponse = await this.orderService.acceptOrder({
        orderId,
        ...dto,
      });

      if (result instanceof AcceptOrderErrors.OrderNotFound) {
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
