import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError } from 'shared/core';

import { UsersCollectionQueryParams } from 'modules/users/adapter';

import { UserService } from '../../services/user.service';

@Controller()
@UseGuards(AuthenticatedGuard)
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
