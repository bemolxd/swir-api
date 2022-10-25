import { QueryListResult } from 'shared/core';
import { User } from '../domain';
import { UsersCollectionQueryParams } from './users-collection.query-params';

export interface IUserRepository {
  exists(personalNumber: string): Promise<boolean>;
  getUserById(userId: string): Promise<User>;
  getUserByPersonalNumber(personalNumber: string): Promise<User>;
  getAllUsers(
    params: UsersCollectionQueryParams,
  ): Promise<QueryListResult<User>>;
  persist(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
}
