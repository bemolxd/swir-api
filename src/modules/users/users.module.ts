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
import { CommandHandlers } from './application/commands/handlers';
import { SignupUserUseCase } from './application/useCases/signupUser';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [GetUsersController],
  providers: [
    UserService,
    ...QueryHandlers,
    ...CommandHandlers,
    GetUsersUseCase,
    SignupUserUseCase,
  ],
})
export class UsersModule {}
