import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import { OrderMap, OrderRepository } from 'modules/orders/adapter';

import { OrderDto } from '../../dto';
import { GetOrderDto } from './get-order.dto';
import { GetOrderErrors } from './get-order.errors';

export type GetOrderResponse = OrderDto | GetOrderErrors.OrderNotFoundError;

export class GetOrderUseCase
  implements UseCase<GetOrderDto, Promise<GetOrderResponse>>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(dto: GetOrderDto): Promise<GetOrderResponse> {
    try {
      const order = await this.orderRepository.getOrderById(dto.orderId);

      return OrderMap.toDto(order);
    } catch (error) {
      return new GetOrderErrors.OrderNotFoundError(dto.orderId);
    }
  }
}
