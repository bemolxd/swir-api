import { Body, Controller, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { ContextType } from 'modules/users/domain/types';

import { AppError, BaseController } from 'shared/core';

import { UserService } from '../../services';
import { ChangeRoleErrors } from './change-role.errors';
import { ChangeRoleResponse } from './change-role.use-case';

@Controller()
export class ChangeRoleController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Put('users/:userId/role')
  async changeRole(
    @Param('userId') userId: string,
    @Body() contextType: ContextType,
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
