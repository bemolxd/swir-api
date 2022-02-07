import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('cui')
  login() {
    return;
  }

  @Get('cui/redirect')
  redirect(@Res() res: Response) {
    res.redirect('/api/auth/protected');
  }

  // test protected route
  @Get('protected')
  protected(@Res() res: Response) {
    res.send('ok');
  }
}
