import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateItemUseCase } from '../../useCases/updateItem';
import { UpdateItemCommand } from '../implementations';

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
  constructor(private updateItemUseCase: UpdateItemUseCase) {}

  async execute({ updateItemDto }: UpdateItemCommand) {
    return await this.updateItemUseCase.execute(updateItemDto);
  }
}
