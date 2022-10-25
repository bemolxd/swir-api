import { ApiProperty } from '@nestjs/swagger';
import { ContextType } from 'modules/users/domain/types';

export class ChangeRoleDto {
  userId: string;
  @ApiProperty({ enum: ContextType })
  contextType: ContextType;
}
