import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import {
  UserRepository,
  UserMap,
  UsersCollectionQueryParams,
} from 'modules/users/adapter';
import { UsersCollectionDto } from '../../dto';

export class GetUsersUseCase
  implements UseCase<undefined, Promise<UsersCollectionDto>>
{
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute(
    params: UsersCollectionQueryParams,
  ): Promise<UsersCollectionDto> {
    const users = await this.userRepository.getAllUsers(params);

    return {
      collection: UserMap.toDtoBulk(users.collection),
      meta: users.meta,
    };
  }
}
