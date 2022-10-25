import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';
import { OrderService } from 'modules/orders/application/services';
import { Order } from 'modules/orders/domain';

import { ItemService } from '../../services';
import { ItemAvailabilityDto, OccupiedDate } from './get-availability.dto';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetAvailabilityController extends BaseController {
  constructor(
    private readonly itemService: ItemService,
    private readonly orderService: OrderService,
  ) {
    super();
  }

  @Get('/items/:itemId/availability')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  async getAvailability(@Param('itemId') itemId: string, @Res() res: Response) {
    try {
      const item = await this.itemService.getItemById({ itemId });
      const { collection: orders } = await this.orderService.getActiveOrders({
        limit: 100,
      });

      const stockQuantity: number = item.quantity;

      const occupiedDates: OccupiedDate[] = (orders as Order[])
        .filter((order: Order) =>
          order.items.find((item) => item.itemId === itemId && order.isPublic),
        )
        .map(({ dateFrom, dateTo, items, orderDoc, techId }) => ({
          dateFrom,
          dateTo,
          occupiedQuantity: items.find((item) => item.itemId === itemId)
            .quantity,
          orderDoc,
          techId,
        }));

      let count = 0;
      occupiedDates
        .filter(({ dateFrom, dateTo }) => {
          const now = new Date();
          const from = new Date(dateFrom);
          const to = new Date(dateTo);

          return now >= from && now <= to;
        })
        .forEach(({ occupiedQuantity }) => (count = count + occupiedQuantity));

      const availability: ItemAvailabilityDto = {
        itemId,
        isNowAvailable: count < stockQuantity,
        availableNowCount: stockQuantity - count,
        occupiedDates,
      };

      return this.ok(res, availability);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
