import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'modules/orders/adapter';
import { UseCase } from 'shared/core';
import { DeleteOrderDto } from './delete-order.dto';
import { DeleteOrderErrors } from './delete-order.errors';

export type DeleteOrderResponse = void | DeleteOrderErrors.OrderNotFound;

export class DeleteOrderUseCase
  implements UseCase<DeleteOrderDto, Promise<DeleteOrderResponse>>
{
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async execute(dto: DeleteOrderDto): Promise<DeleteOrderResponse> {
    try {
      await this.orderRepository.delete({ order_id: dto.orderId });

      return;
    } catch (error) {
      return new DeleteOrderErrors.OrderNotFound(dto.orderId);
    }
  }
}
