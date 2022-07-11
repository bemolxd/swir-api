import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FinishOrderUseCase } from '../../useCases/finishOrder';
import { FinishOrderCommand } from '../implementations';

@CommandHandler(FinishOrderCommand)
export class FinishOrderHandler implements ICommandHandler {
  constructor(private finishOrderUseCase: FinishOrderUseCase) {}

  async execute({ finishOrderDto }: FinishOrderCommand) {
    return await this.finishOrderUseCase.execute(finishOrderDto);
  }
}
