import { Controller, Delete, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { DeleteOrderResponse } from './delete-order.use-case';
import { DeleteOrderErrors } from './delete-order.errors';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class DeleteOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Delete('users/:senderId/orders/:orderId')
  @ContextTypes(ContextType.GLOBAL, ContextType.USER)
  async deleteOrder(
    @Param('senderId') senderId: string,
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const result: DeleteOrderResponse = await this.orderService.deleteOrder({
        orderId,
        senderId,
      });

      if (result instanceof DeleteOrderErrors.OrderNotFound) {
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
