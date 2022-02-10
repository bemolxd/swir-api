import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateItemUseCase } from '../../useCases/createItem';
import { CreateItemCommand } from '../implementations';

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(private createItemUseCase: CreateItemUseCase) {}

  async execute({ createItemDto }: CreateItemCommand) {
    return await this.createItemUseCase.execute(createItemDto);
  }
}
