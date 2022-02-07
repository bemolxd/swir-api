import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { UserRepository } from './adapter';
import { UserService } from './application/services';
import {
  GetUsersController,
  GetUsersUseCase,
} from './application/useCases/getUsers';
import { QueryHandlers } from './application/queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [GetUsersController],
  providers: [UserService, ...QueryHandlers, GetUsersUseCase],
})
export class UsersModule {}
