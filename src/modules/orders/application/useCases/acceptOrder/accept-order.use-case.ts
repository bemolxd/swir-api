import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';
import { Order, OrderStatus } from 'modules/orders/domain';

import { OrderDto } from '../../dto';
import { AcceptOrderDto } from './accept-order.dto';
import { AcceptOrderErrors } from './accept-order.errors';

export type AcceptOrderResponse = OrderDto | AcceptOrderErrors.OrderNotFound;

export class AcceptOrderUseCase
  implements UseCase<AcceptOrderDto, AcceptOrderResponse>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(dto: AcceptOrderDto): Promise<AcceptOrderResponse> {
    try {
      const order = await this.orderRepository.getOrderById(dto.orderId);

      const updatedOrder = Order.create(
        {
          senderId: order.senderId,
          senderComment: order.senderComment,
          techId: order.techId,
          dateFrom: dto.dateFrom,
          dateTo: dto.dateTo,
          isPublic: true,
          items: dto.items,
          isRejected: false,
          status: OrderStatus.PUBLISHED,
          techComment: dto.techComment,
          isArchived: order.isArchived,
        },
        new UniqueEntityID(dto.orderId),
      );

      await this.orderRepository.updateOrder(updatedOrder);

      return OrderMap.toDto(updatedOrder);
    } catch (error) {
      return new AcceptOrderErrors.OrderNotFound(dto.orderId);
    }
  }
}
