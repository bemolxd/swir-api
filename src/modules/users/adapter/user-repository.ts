import { User } from '../domain';

export interface IUserRepository {
  exists(personalNumber: string): Promise<boolean>;
  getUserById(userId: string): Promise<User>;
  persist(user: User): Promise<void>;
}
