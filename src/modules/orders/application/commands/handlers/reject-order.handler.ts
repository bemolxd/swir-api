import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RejectOrderUseCase } from '../../useCases/rejectOrder';
import { RejectOrderCommand } from '../implementations';

@CommandHandler(RejectOrderCommand)
export class RejectOrderHandler implements ICommandHandler<RejectOrderCommand> {
  constructor(private rejectOrderUseCase: RejectOrderUseCase) {}

  async execute({ rejectOrderDto }: RejectOrderCommand) {
    return await this.rejectOrderUseCase.execute(rejectOrderDto);
  }
}
