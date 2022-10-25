import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController, QueryParams } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { OrdersCollectionDto } from '../../dto';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetUserOrdersController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('users/:senderId/orders')
  @ContextTypes(ContextType.USER)
  @ApiOkResponse({ type: OrdersCollectionDto })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @ApiQuery({ name: 'order', type: 'string', required: false })
  @ApiQuery({ name: 'senderId', type: 'string', required: false })
  @ApiQuery({ name: 'techId', type: 'string', required: false })
  async getAllUserOrders(
    @Query() params: QueryParams,
    @Param('senderId') senderId: string,
    @Res() res: Response,
  ) {
    try {
      const orders = await this.orderService.getUserActiveOrders({
        ...params,
        senderId,
      });

      return this.ok(res, orders);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
