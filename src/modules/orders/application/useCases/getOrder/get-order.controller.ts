import { Controller, Get, Param, Res, UseGuards, Req } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { Response, Request } from 'express';
import { AppError, BaseController } from 'shared/core';

import { User } from 'modules/users/domain';
import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { GetOrderErrors } from './get-order.errors';
import { GetOrderResponse } from './get-order.use-case';
import { OrderDto } from '../../dto';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('orders/:orderId')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async getOrderById(
    @Param('orderId') orderId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const result: GetOrderResponse = await this.orderService.getOrderById({
        orderId,
      });

      if (result instanceof GetOrderErrors.OrderNotFoundError) {
        return this.notFound(res, result);
      }

      const user = req.user as User;
      const order = result as any;

      if (user.contextType === ContextType.USER) {
        if (user.userId !== order.senderId) {
          return this.notFound(
            res,
            new GetOrderErrors.OrderNotFoundError((result as any).orderId),
          );
        }
      }

      return this.ok(res, result);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
