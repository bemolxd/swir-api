import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';

import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderErrors } from './create-order.errors';
import { CreateOrderResponse } from './create-order.use-case';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class CreateOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders')
  @ContextTypes(ContextType.USER)
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
