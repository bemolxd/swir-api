import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { OrderService } from '../../services';
import { RemoveItemElementDto } from './remove-item-element.dto';
import { RemoveItemElementErrors } from './remove-item-element.errors';
import { RemoveItemElementResponse } from './remove-item-element.use-case';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class RemoveItemElementController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Put('orders/:orderId/removeElement')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  async removeElement(
    @Body() removeElementDto: RemoveItemElementDto,
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const result: RemoveItemElementResponse =
        await this.orderService.removeItemElement(removeElementDto, orderId);

      if (result instanceof RemoveItemElementErrors.OrderNotFoundError) {
        return this.badRequest(res, result);
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
