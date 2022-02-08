import { CreateUserDto } from '../../useCases/signupUser';

export class SignupUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
