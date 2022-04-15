import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ChangeRoleUseCase } from '../../useCases/changeRole';
import { ChangeRoleCommand } from '../implementations';

@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand> {
  constructor(private changeRoleUseCase: ChangeRoleUseCase) {}

  async execute({ changeRoleDto }: ChangeRoleCommand) {
    return await this.changeRoleUseCase.execute(changeRoleDto);
  }
}
