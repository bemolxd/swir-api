import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { SubmitOrderBodyDto } from './submit-order.dto';
import { SubmitOrderResponse } from './submit-order.use-case';
import { OrderDto } from '../../dto';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class SubmitOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('users/:userId/orders/:orderId/submit')
  @ContextTypes(ContextType.USER)
  @ApiOkResponse({ type: OrderDto })
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

      return this.ok(res, result);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
