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
import {
  GetUserUseCase,
  GetUserController,
} from './application/useCases/getUser';
import {
  GetAdminsController,
  GetAdminsUseCase,
} from './application/useCases/getAdmins';
import {
  ChangeRoleController,
  ChangeRoleUseCase,
} from './application/useCases/changeRole';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [
    GetUsersController,
    GetUserController,
    GetAdminsController,
    ChangeRoleController,
  ],
  providers: [
    UserService,
    ...QueryHandlers,
    ...CommandHandlers,
    GetUsersUseCase,
    GetUserUseCase,
    SignupUserUseCase,
    GetAdminsUseCase,
    ChangeRoleUseCase,
  ],
})
export class UsersModule {}
