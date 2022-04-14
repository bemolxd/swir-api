import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthenticatedGuard, OAuth2Guard } from './guards';

@Controller('auth')
export class AuthController {
  @Get('cui')
  @UseGuards(OAuth2Guard)
  login() {
    return;
  }

  @Get('cui/redirect')
  @UseGuards(OAuth2Guard)
  redirect(@Res() res: Response) {
    res.redirect(process.env.APP_CLIENT_URL);
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  protected(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect(
      `${process.env.OAUTH_LOGOUT_URL}?url=${process.env.APP_CLIENT_URL}/`,
    );
  }
}
