import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';
import { AppError, BaseController } from 'shared/core';

import { User } from 'modules/users/domain';
import { ContextType } from 'modules/users/domain/types';

import { UserService } from '../../services';
import { GetUserErrors } from './get-user.errors';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetUserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('users/:userId')
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  async getUserById(
    @Param('userId') userId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const result = await this.userService.getUserById({ userId });

      if (result instanceof GetUserErrors.UserNotFoundError) {
        return this.notFound(res, result);
      }

      const reqUser = req.user as User;
      const user = result as any;
      if (reqUser.contextType === ContextType.USER) {
        if (user.contextType === ContextType.USER) {
          return this.notFound(
            res,
            new GetUserErrors.UserNotFoundError(userId),
          );
        }
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
