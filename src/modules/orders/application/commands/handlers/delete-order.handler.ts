import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteOrderUseCase } from '../../useCases/deleteOrder';
import { DeleteOrderCommand } from '../implementations';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {}

  async execute({ deleteOrderDto }: DeleteOrderCommand) {
    return await this.deleteOrderUseCase.execute(deleteOrderDto);
  }
}
