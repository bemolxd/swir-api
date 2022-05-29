import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { SubmitOrderBodyDto } from './submit-order.dto';
import { SubmitOrderResponse } from './submit-order.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class SubmitOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('users/:userId/orders/:orderId/submit')
  async submitOrder(
    @Body() body: SubmitOrderBodyDto,
    @Param('senderId') senderId: string,
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const result: SubmitOrderResponse = await this.orderService.submitOrder({
        senderId,
        orderId,
        ...body,
      });

      //TODO: obsługa błędów

      return this.ok(res, result);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
