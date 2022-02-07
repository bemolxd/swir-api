import { HttpService } from '@nestjs/axios';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { firstValueFrom } from 'rxjs';

export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(private readonly httpService: HttpService) {
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
    _refreshToken: string,
    _profile: any,
    done: any,
  ): Promise<any> {
    const { data: profile } = await firstValueFrom(
      this.httpService.get(
        `${process.env.OAUTH_PROFILE_URL}?access_token=${accessToken}`,
      ),
    );

    // TODO: check user in db
    return done(null, profile);
  }
}
