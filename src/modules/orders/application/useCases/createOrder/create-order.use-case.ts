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
      techId: dto.techId,
      items: dto.items,
      status: OrderStatus.PENDING,
      isPublic: false,
      dateFrom: dto.dateFrom,
      dateTo: dto.dateTo,
      techComment: null,
      senderComment: dto.senderComment,
    });

    try {
      await this.orderRepository.persist(newOrder);
    } catch (error) {
      return new CreateOrderErrors.OrderAlreadyExists();
    }

    return OrderMap.toDto(newOrder);
  }
}
