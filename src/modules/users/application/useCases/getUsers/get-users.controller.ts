import { Controller, Get, Query } from '@nestjs/common';
import { UsersCollectionQueryParams } from 'modules/users/adapter';

import { UserService } from '../../services/user.service';

@Controller()
export class GetUsersController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers(@Query() params: UsersCollectionQueryParams) {
    const users = this.userService.getAllUsers(params);

    return users;
  }
}
