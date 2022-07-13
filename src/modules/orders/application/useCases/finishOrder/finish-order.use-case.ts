import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';
import { Order, OrderStatus } from 'modules/orders/domain';

import { OrderDto } from '../../dto';
import { FinishOrderDto } from './finish-order.dto';
import { FinishOrderErrors } from './finish-order.errors';

export type FinishOrderResponse = OrderDto | FinishOrderErrors.OrderNotFound;

export class FinishOrderUseCase
  implements UseCase<FinishOrderDto, FinishOrderResponse>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(dto: FinishOrderDto): Promise<FinishOrderResponse> {
    try {
      const order = await this.orderRepository.getOrderById(dto.orderId);

      const updatedOrder = Order.create(
        {
          senderId: order.senderId,
          senderComment: order.senderComment,
          techId: order.techId,
          dateFrom: order.dateFrom,
          dateTo: order.dateTo,
          items: order.items,
          isRejected: order.isRejected,
          isPublic: false,
          status: OrderStatus.FINISHED,
          techComment: dto.techComment,
          isArchived: true,
        },
        new UniqueEntityID(dto.orderId),
      );

      await this.orderRepository.updateOrder(updatedOrder);

      return OrderMap.toDto(updatedOrder);
    } catch (error) {
      return new FinishOrderErrors.OrderNotFound(dto.orderId);
    }
  }
}
