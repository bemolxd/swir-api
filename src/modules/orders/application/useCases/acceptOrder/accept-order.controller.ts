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
import { AcceptOrderBodyDto } from './accept-order.dto';
import { AcceptOrderErrors } from './accept-order.errors';
import { AcceptOrderResponse } from './accept-order.use-case';
import { OrderDto } from '../../dto';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class AcceptOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders/:orderId/accept')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH)
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
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
