import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveItemElementUseCase } from '../../useCases/removeItemElement';
import { RemoveItemElementCommand } from '../implementations';

@CommandHandler(RemoveItemElementCommand)
export class RemoveItemElementHandler implements ICommandHandler {
  constructor(private removeItemElementUseCase: RemoveItemElementUseCase) {}

  async execute({ removeItemElementDto, orderId }: RemoveItemElementCommand) {
    return await this.removeItemElementUseCase.execute(
      removeItemElementDto,
      orderId,
    );
  }
}
