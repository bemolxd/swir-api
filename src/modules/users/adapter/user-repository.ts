import { User } from '../domain';

export interface IUserRepository {
  exists(personalNumber: string): Promise<boolean>;
  getUserById(userId: string): Promise<User>;
  getUserByPersonalNumber(personalNumber: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  persist(user: User): Promise<void>;
}
