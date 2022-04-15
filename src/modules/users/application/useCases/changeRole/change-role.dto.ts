import { ContextType } from 'modules/users/domain/types';

export class ChangeRoleDto {
  userId: string;
  contextType: ContextType;
}
