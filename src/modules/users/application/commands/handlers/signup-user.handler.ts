import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SignupUserUseCase } from '../../useCases/signupUser';
import { SignupUserCommand } from '../implementations';

@CommandHandler(SignupUserCommand)
export class SignupUserHandler implements ICommandHandler<SignupUserCommand> {
  constructor(private signupUserUseCase: SignupUserUseCase) {}

  async execute({ createUserDto }: SignupUserCommand) {
    return await this.signupUserUseCase.execute(createUserDto);
  }
}
