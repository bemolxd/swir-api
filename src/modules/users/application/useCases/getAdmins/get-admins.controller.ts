import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthenticatedGuard } from 'auth/guards';

import { AppError, BaseController } from 'shared/core';

import { UserService } from '../../services';

@Controller()
@UseGuards(AuthenticatedGuard)
export class GetAdminsController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('admins')
  // TODO: dodać jakieś query params, które zagwarantują pobranie wszystkich adminów
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
