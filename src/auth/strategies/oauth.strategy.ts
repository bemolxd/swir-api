import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { firstValueFrom } from 'rxjs';

import { UserService } from 'modules/users/application/services';

import { DoneFun, AuthProfile } from '../types';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {
    super({
      authorizationURL: process.env.OAUTH_AUTHORIZATION_URL,
      tokenURL: process.env.OAUTH_ACCESS_TOKEN_URL,
      callbackURL: process.env.OAUTH_REDIRECT_URL,
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: unknown,
    _profile: unknown,
    done: DoneFun,
  ): Promise<void> {
    const { data: profile } = await firstValueFrom(
      this.httpService.get<AuthProfile>(
        `${process.env.OAUTH_PROFILE_URL}?access_token=${accessToken}`,
      ),
    );

    const user = await this.userService.signupUser({
      personalNumber: profile.attributes.personNumber,
      firstName: profile.attributes.firstName,
      lastName: profile.attributes.lastName,
      email: profile.attributes.mail,
    });

    return done(null, user);
  }
}
