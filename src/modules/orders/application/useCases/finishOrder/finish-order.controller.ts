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
import { FinishOrderBodyDto } from './finish-order.dto';
import { FinishOrderErrors } from './finish-order.errors';
import { FinishOrderResponse } from './finish-order.use-case';
import { OrderDto } from '../../dto';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class FinishOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders/:orderId/finish')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH)
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
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
