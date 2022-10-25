import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { UserDto } from 'modules/users/application/dto';

import { AuthenticatedGuard, OAuth2Guard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('cui')
  @ApiResponse({ status: 307, description: 'Redirect to CPL PG services' })
  @UseGuards(OAuth2Guard)
  login() {
    return;
  }

  @Get('cui/redirect')
  @UseGuards(OAuth2Guard)
  @ApiResponse({ status: 307, description: 'Redirect to APP default page URL' })
  redirect(@Res() res: Response) {
    res.redirect(process.env.APP_CLIENT_URL);
  }

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  @UseGuards(AuthenticatedGuard)
  protected(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @ApiResponse({ status: 302, description: 'Logout from SWiR and CPL PG' })
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect(
      `${process.env.OAUTH_LOGOUT_URL}?url=${process.env.APP_CLIENT_URL}/`,
    );
  }
}
