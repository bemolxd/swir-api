import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SubmitOrderUseCase } from '../../useCases/submitOrder';
import { SubmitOrderCommand } from '../implementations';

@CommandHandler(SubmitOrderCommand)
export class SubmitOrderHandler implements ICommandHandler<SubmitOrderCommand> {
  constructor(private submitOrderUseCase: SubmitOrderUseCase) {}

  async execute({ submitOrderDto }: SubmitOrderCommand) {
    return await this.submitOrderUseCase.execute(submitOrderDto);
  }
}
