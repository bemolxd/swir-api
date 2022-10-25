import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';

import { ContextType } from 'modules/users/domain/types';

import { AppError, BaseController } from 'shared/core';

import { UserService } from '../../services';
import { ChangeRoleErrors } from './change-role.errors';
import { ChangeRoleResponse } from './change-role.use-case';

@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class ChangeRoleController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Put('users/:userId/role')
  @ContextTypes(ContextType.GLOBAL)
  async changeRole(
    @Param('userId') userId: string,
    @Body('contextType') contextType: ContextType,
    @Res() res: Response,
  ) {
    try {
      const result: ChangeRoleResponse = await this.userService.changeRole({
        userId,
        contextType,
      });

      if (result instanceof ChangeRoleErrors.UserNotFoundError) {
        return this.badRequest(res, result);
      }

      return this.ok(res);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
