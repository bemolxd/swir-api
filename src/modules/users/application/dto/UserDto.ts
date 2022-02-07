import { ContextType } from 'modules/users/domain/types';

export class UserDto {
  userId: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  contextType: ContextType;
}
