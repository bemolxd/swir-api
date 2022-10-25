import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import {
  AuthenticatedGuard,
  ContextTypeGuard,
  ContextTypes,
} from 'auth/guards';

import { AppError, BaseController } from 'shared/core';

import { ContextType } from 'modules/users/domain/types';

import { UserService } from '../../services';
import { UsersCollectionDto } from '../../dto';

@ApiTags('Users')
@Controller()
@UseGuards(AuthenticatedGuard, ContextTypeGuard)
export class GetAdminsController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('admins')
  @ApiOkResponse({ type: UsersCollectionDto })
  @ContextTypes(ContextType.GLOBAL, ContextType.TECH, ContextType.USER)
  async getAdmins(@Res() res: Response) {
    try {
      const admins = await this.userService.getAdmins();

      return this.ok(res, admins);
    } catch (error) {
      return this.fail<AppError.UnexpectedError>(
        res,
        new AppError.UnexpectedError(error),
      );
    }
  }
}
