import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';
import { Order, OrderStatus } from 'modules/orders/domain';

import { OrderDto } from '../../dto';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderErrors } from './create-order.errors';

export type CreateOrderResponse =
  | OrderDto
  | CreateOrderErrors.OrderAlreadyExists
  | CreateOrderErrors.ItemsNotAvailable;

export class CreateOrderUseCase
  implements UseCase<CreateOrderDto, CreateOrderResponse>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(dto: CreateOrderDto): Promise<CreateOrderResponse> {
    const newOrder = Order.create({
      senderId: dto.senderId,
      items: dto.items,
      status: OrderStatus.COMPLETING,
      isPublic: false,
      isRejected: false,
      techId: null,
      dateFrom: null,
      dateTo: null,
      techComment: null,
      senderComment: null,
      isArchived: false,
    });

    try {
      await this.orderRepository.persist(newOrder);
    } catch (error) {
      console.error(error);

      return new CreateOrderErrors.OrderAlreadyExists();
    }

    return OrderMap.toDto(newOrder);
  }
}
