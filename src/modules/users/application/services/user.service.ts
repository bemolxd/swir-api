import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UsersCollectionQueryParams } from 'modules/users/adapter';

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

  async getAllUsers(params: UsersCollectionQueryParams) {
    return this.queryBus.execute(new GetUsersQuery(params));
  }

  async getUserById(getUserDto: GetUserDto) {
    return this.queryBus.execute(new GetUserQuery(getUserDto));
  }
}
