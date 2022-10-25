import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { Response } from 'express';

import { ContextType } from 'modules/users/domain/types';

import { AppError, BaseController } from 'shared/core';
import { OrderDto } from '../../dto';

import { OrderService } from '../../services';
import { AddItemElementDto } from './add-item-element.dto';
import { AddItemElementErrors } from './add-item-element.errors';
import { AddItemElementResponse } from './add-item-element.use-case';

@ApiTags('Orders')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class AddItemElementController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Put('orders/:orderId/addElement')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async addElement(
    @Body() addElementDto: AddItemElementDto,
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const result: AddItemElementResponse =
        await this.orderService.addItemElement(addElementDto, orderId);

      if (result instanceof AddItemElementErrors.OrderNotFoundError) {
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
