import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddItemElementUseCase } from '../../useCases/addItemElement';
import { AddItemElementCommand } from '../implementations';

@CommandHandler(AddItemElementCommand)
export class AddItemElementHandler implements ICommandHandler {
  constructor(private addItemElementUseCase: AddItemElementUseCase) {}

  async execute({ addItemElementDto, orderId }: AddItemElementCommand) {
    return await this.addItemElementUseCase.execute(addItemElementDto, orderId);
  }
}
