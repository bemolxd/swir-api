import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { AddItemElementDto } from './add-item-element.dto';
import { AddItemElementErrors } from './add-item-element.errors';
import { AddItemElementResponse } from './add-item-element.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class AddItemElementController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Put('orders/:orderId/addElement')
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
