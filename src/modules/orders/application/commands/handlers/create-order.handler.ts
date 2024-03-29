import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrderUseCase } from '../../useCases/createOrder';
import { CreateOrderCommand } from '../implementations/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async execute({ createOrderDto }: CreateOrderCommand) {
    return await this.createOrderUseCase.execute(createOrderDto);
  }
}
