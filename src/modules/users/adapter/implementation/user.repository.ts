import { EntityRepository } from 'typeorm';
import { BaseRepository, QueryListResult } from 'shared/core';

import { UserEntity } from 'modules/users/infrastructure';
import { User } from 'modules/users/domain';

import { IUserRepository } from '../user-repository';
import { UserMap } from './user.map';
import { UsersCollectionQueryParams } from '../users-collection.query-params';

@EntityRepository(UserEntity)
export class UserRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository
{
  async exists(personalNumber: string): Promise<boolean> {
    const user = await this.findOne({ personal_number: personalNumber });

    return !!user;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.findOne({ user_id: userId });

    if (!user) throw new Error('User not found');

    return UserMap.toDomain(user);
  }

  async getUserByPersonalNumber(personalNumber: string): Promise<User> {
    const user = await this.findOne({ personal_number: personalNumber });

    if (!user) throw new Error('User not found');

    return UserMap.toDomain(user);
  }

  async getAllUsers({
    limit = 10,
    offset = 0,
  }: UsersCollectionQueryParams): Promise<QueryListResult<User>> {
    const query = this.createPaginatedQueryBuilder('users', { limit, offset });

    const [collection, total] = await query.getManyAndCount();

    return {
      collection: UserMap.toDomainBulk(collection),
      meta: {
        limit,
        offset,
        total,
      },
    };
  }

  async persist(user: User): Promise<void> {
    const existingUser = await this.exists(user.personalNumber);

    if (!!existingUser) return;

    const userEntity = UserMap.toPersistance(user);

    await this.create(userEntity).save();
  }
}
