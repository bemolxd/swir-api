import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { SessionSerializer } from './serializers';
import { OAuth2Strategy } from './strategies';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [OAuth2Strategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
