import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth';
import { config } from './db';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule],
})
export class AppModule {}
