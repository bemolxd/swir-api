import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

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
    res.redirect('/api/auth/protected');
  }

  // test protected route
  @Get('protected')
  @UseGuards(AuthenticatedGuard)
  protected(@Res() res: Response) {
    res.send('ok');
  }
}
