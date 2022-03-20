import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderErrors } from './create-order.errors';
import { CreateOrderResponse } from './create-order.use-case';

@Controller()
// TODO: @UseGuards(AuthenticatedGuard)
export class CreateOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Res() res: Response,
  ) {
    try {
      const result: CreateOrderResponse = await this.orderService.createOrder(
        createOrderDto,
      );

      if (
        result instanceof CreateOrderErrors.OrderAlreadyExists ||
        result instanceof CreateOrderErrors.ItemsNotAvailable
      ) {
        return this.badRequest(res, result);
      }

      return this.created(res);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
