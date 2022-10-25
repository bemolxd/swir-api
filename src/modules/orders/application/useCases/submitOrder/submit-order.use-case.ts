import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';
import { Order, OrderStatus } from 'modules/orders/domain';

import { SubmitOrderDto } from './submit-order.dto';
import { OrderDto } from '../../dto';

export type SubmitOrderResponse = OrderDto;

export class SubmitOrderUseCase
  implements UseCase<SubmitOrderDto, SubmitOrderResponse>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(dto: SubmitOrderDto): Promise<SubmitOrderResponse> {
    const updatedOrder = Order.create(
      {
        orderDoc: null,
        senderId: dto.senderId,
        techId: dto.techId,
        senderComment: dto.senderComment,
        items: dto.items,
        dateFrom: dto.dateFrom,
        dateTo: dto.dateTo,
        isPublic: false,
        isRejected: false,
        status: OrderStatus.PENDING,
        techComment: null,
        isArchived: false,
      },
      new UniqueEntityID(dto.orderId),
    );

    try {
      await this.orderRepository.updateOrder(updatedOrder);

      return OrderMap.toDto(updatedOrder);
    } catch (error) {}
  }
}
