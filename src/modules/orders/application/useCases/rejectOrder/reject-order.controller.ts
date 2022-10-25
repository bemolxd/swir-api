import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { Response } from 'express';
import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { RejectOrderErrors } from './reject-order.errors';
import { RejectOrderResponse } from './reject-order.use-case';
import { OrderDto } from '../../dto';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class RejectOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders/:orderId/reject')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH)
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async rejectOrder(
    @Param('orderId') orderId: string,
    @Body('techComment') techComment: string,
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
