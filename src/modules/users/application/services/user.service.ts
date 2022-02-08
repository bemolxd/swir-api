import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SignupUserCommand } from '../commands/implementations';
import { GetUsersQuery, GetUserQuery } from '../queries/implementations';
import { GetUserDto } from '../useCases/getUser';
import { CreateUserDto } from '../useCases/signupUser';

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async signupUser(createUserDto: CreateUserDto) {
    return this.commandBus.execute(new SignupUserCommand(createUserDto));
  }

  async getAllUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  async getUserById(getUserDto: GetUserDto) {
    return this.queryBus.execute(new GetUserQuery(getUserDto));
  }
}
