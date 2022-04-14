import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';

import { UserMap, UserRepository } from 'modules/users/adapter';

import { UsersCollectionDto } from '../../dto';
import { ContextType } from 'modules/users/domain/types';

export class GetAdminsUseCase
  implements UseCase<undefined, Promise<UsersCollectionDto>>
{
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async execute(): Promise<UsersCollectionDto> {
    const users = await this.userRepository.getAllUsers({});

    return {
      collection: UserMap.toDtoBulk(
        users.collection.filter(
          (user) => user.contextType !== ContextType.USER,
        ),
      ),
      meta: users.meta,
    };
  }
}
