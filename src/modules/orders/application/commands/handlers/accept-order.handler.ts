import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AcceptOrderUseCase } from '../../useCases/acceptOrder';
import { AcceptOrderCommand } from '../implementations';

@CommandHandler(AcceptOrderCommand)
export class AcceptOrderHandler implements ICommandHandler<AcceptOrderCommand> {
  constructor(private acceptOrderUseCase: AcceptOrderUseCase) {}

  async execute({ acceptOrderDto }: AcceptOrderCommand) {
    return await this.acceptOrderUseCase.execute(acceptOrderDto);
  }
}
