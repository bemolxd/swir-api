import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError } from 'shared/core';

import { UserService } from '../../services';
import { GetUserErrors } from './get-user.errors';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetUserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:userId')
  async getUserById(@Param('userId') userId: string) {
    try {
      const result = this.userService.getUserById({ userId });

      if (result instanceof GetUserErrors.UserNotFoundError) {
        return new NotFoundException(result.message);
      }

      return result;
    } catch (error) {
      return new HttpException(new AppError.UnexpectedError(error), 500);
    }
  }
}
