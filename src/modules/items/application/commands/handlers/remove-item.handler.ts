import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveItemUseCase } from '../../useCases/removeItem';
import { RemoveItemCommand } from '../implementations';

@CommandHandler(RemoveItemCommand)
export class RemoveItemHandler implements ICommandHandler<RemoveItemCommand> {
  constructor(private removeItemUseCase: RemoveItemUseCase) {}

  async execute({ removeItemDto }: RemoveItemCommand) {
    return await this.removeItemUseCase.execute(removeItemDto);
  }
}
