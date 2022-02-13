import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { AppError } from 'shared/core';

import { UsersCollectionQueryParams } from 'modules/users/adapter';

import { UserService } from '../../services/user.service';

@Controller()
export class GetUsersController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers(@Query() params: UsersCollectionQueryParams) {
    try {
      const users = this.userService.getAllUsers(params);

      return users;
    } catch (error) {
      return new HttpException(new AppError.UnexpectedError(error), 500);
    }
  }
}
