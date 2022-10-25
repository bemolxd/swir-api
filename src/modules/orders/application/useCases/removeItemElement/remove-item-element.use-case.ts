import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';
import { Order } from 'modules/orders/domain';

import { OrderDto } from '../../dto';
import { RemoveItemElementDto } from './remove-item-element.dto';
import { RemoveItemElementErrors } from './remove-item-element.errors';

export type RemoveItemElementResponse =
  | OrderDto
  | RemoveItemElementErrors.OrderNotFoundError;

export class RemoveItemElementUseCase
  implements UseCase<RemoveItemElementDto, Promise<RemoveItemElementResponse>>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(
    dto: RemoveItemElementDto,
    orderId: string,
  ): Promise<RemoveItemElementResponse> {
    try {
      const order = await this.orderRepository.getOrderById(orderId);

      const updatedOrder = Order.create(
        {
          orderDoc: order.orderDoc,
          senderId: order.senderId,
          senderComment: order.senderComment,
          techId: order.techId,
          techComment: order.techComment,
          dateFrom: order.dateFrom,
          dateTo: order.dateTo,
          status: order.status,
          isPublic: order.isPublic,
          isRejected: order.isRejected,
          isArchived: order.isArchived,
          items: order.items.filter((item) => item.itemId !== dto.itemId),
        },
        new UniqueEntityID(orderId),
      );

      await this.orderRepository.updateOrder(updatedOrder);

      return OrderMap.toDto(updatedOrder);
    } catch (error) {
      return new RemoveItemElementErrors.OrderNotFoundError(orderId);
    }
  }
}
