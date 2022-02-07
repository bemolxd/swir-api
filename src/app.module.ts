import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth';
import { config } from './db';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PassportModule.register({ session: true }),
    AuthModule,
  ],
})
export class AppModule {}
