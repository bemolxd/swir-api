import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { RemoveItemElementDto } from './remove-item-element.dto';
import { RemoveItemElementErrors } from './remove-item-element.errors';
import { RemoveItemElementResponse } from './remove-item-element.use-case';

@Controller()
@UseGuards(AuthenticatedGuard)
export class RemoveItemElementController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Put('orders/:orderId/removeElement')
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
