import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { Order } from 'modules/orders/domain';
import { OrderMap, OrderRepository } from 'modules/orders/adapter';

import { OrderDto } from '../../dto';
import { AddItemElementDto } from './add-item-element.dto';
import { AddItemElementErrors } from './add-item-element.errors';

export type AddItemElementResponse =
  | OrderDto
  | AddItemElementErrors.OrderNotFoundError;

export class AddItemElementUseCase
  implements UseCase<AddItemElementDto, Promise<AddItemElementResponse>>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(
    dto: AddItemElementDto,
    orderId: string,
  ): Promise<AddItemElementResponse> {
    try {
      const order = await this.orderRepository.getOrderById(orderId);

      let updatedOrder: Order;

      const existingItem = order.items.find(
        (item) => item.itemId === dto.item.itemId,
      );

      if (!!existingItem) {
        updatedOrder = Order.create(
          {
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
            items: order.items.map((item) => {
              if (item.itemId === dto.item.itemId) {
                return {
                  itemId: existingItem.itemId,
                  quantity: existingItem.quantity + 1,
                };
              }
              return item;
            }),
          },
          new UniqueEntityID(orderId),
        );

        await this.orderRepository.updateOrder(updatedOrder);

        return OrderMap.toDto(updatedOrder);
      }

      updatedOrder = Order.create(
        {
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
          items: [...order.items, dto.item],
        },
        new UniqueEntityID(orderId),
      );

      await this.orderRepository.updateOrder(updatedOrder);

      return OrderMap.toDto(updatedOrder);
    } catch (error) {
      return new AddItemElementErrors.OrderNotFoundError(orderId);
    }
  }
}
