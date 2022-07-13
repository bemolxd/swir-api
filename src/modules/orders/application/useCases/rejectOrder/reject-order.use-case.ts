import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';
import { Order, OrderStatus } from 'modules/orders/domain';

import { OrderDto } from '../../dto';
import { RejectOrderDto } from './reject-order.dto';
import { RejectOrderErrors } from './reject-order.errors';

export type RejectOrderResponse = OrderDto | RejectOrderErrors.OrderNotFound;

export class RejectOrderUseCase
  implements UseCase<RejectOrderDto, RejectOrderResponse>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(dto: RejectOrderDto): Promise<RejectOrderResponse> {
    try {
      const order = await this.orderRepository.getOrderById(dto.orderId);

      const updatedOrder = Order.create(
        {
          senderId: order.senderId,
          senderComment: order.senderComment,
          techId: order.techId,
          dateFrom: order.dateFrom,
          dateTo: order.dateTo,
          isPublic: order.isPublic,
          items: order.items,
          isRejected: true,
          status: OrderStatus.AWARDED,
          techComment: dto.techComment,
          isArchived: true,
        },
        new UniqueEntityID(dto.orderId),
      );

      await this.orderRepository.updateOrder(updatedOrder);

      return OrderMap.toDto(updatedOrder);
    } catch (error) {
      return new RejectOrderErrors.OrderNotFound(dto.orderId);
    }
  }
}
