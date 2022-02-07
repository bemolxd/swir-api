import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from 'modules/users/infrastructure';
import { User } from 'modules/users/domain';

import { IUserRepository } from '../user-repository';
import { UserMap } from './user.map';

@EntityRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
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

  async getAllUsers(): Promise<User[]> {
    const users = await this.find();

    return users.map((user) => UserMap.toDomain(user));
  }

  async persist(user: User): Promise<void> {
    const existingUser = await this.exists(user.personalNumber);

    if (!!existingUser) return;

    const userEntity = UserMap.toPersistance(user);

    await this.create(userEntity).save();
  }
}
