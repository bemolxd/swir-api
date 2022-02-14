import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { UserService } from '../../services';
import { GetUserErrors } from './get-user.errors';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetUserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('users/:userId')
  async getUserById(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result = await this.userService.getUserById({ userId });

      if (result instanceof GetUserErrors.UserNotFoundError) {
        return this.notFound(res, result);
      }

      return this.ok(res, result);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
