import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'shared/core';

import { OrderService } from '../../services';
import { FinishOrderBodyDto } from './finish-order.dto';

@Controller()
export class FinishOrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('orders/:orderId/finish')
  async finishOrder(
    @Param('orderId') orderId: string,
    @Body() dto: FinishOrderBodyDto,
    @Res() res: Response,
  ) {}
}
