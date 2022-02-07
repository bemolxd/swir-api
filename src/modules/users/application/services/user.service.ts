import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUsersQuery } from '../queries/implementations/get-users.query';

@Injectable()
export class UserService {
  constructor(private readonly queryBus: QueryBus) {}

  async getAllUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }
}
