import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from 'modules/users';

import { UserService } from 'modules/users/application/services';

import { AuthController } from './auth.controller';
import { SessionSerializer } from './serializers';
import { OAuth2Strategy } from './strategies';

@Module({
  imports: [
    CqrsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    UsersModule,
  ],
  providers: [OAuth2Strategy, SessionSerializer, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
