import {
  Controller,
  Get,
  HttpException,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { UsersCollectionQueryParams } from 'modules/users/adapter';

import { UserService } from '../../services/user.service';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetUsersController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('users')
  async getAllUsers(
    @Query() params: UsersCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const users = await this.userService.getAllUsers(params);

      return this.ok(res, users);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
