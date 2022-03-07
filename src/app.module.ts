import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'modules/users';
import { ItemsModule } from 'modules/items';
import { OrdersModule } from 'modules/orders';

import { AuthModule } from './auth';
import { config } from './db';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,
    ItemsModule,
    OrdersModule,
  ],
})
export class AppModule {}
