import { ApiProperty } from '@nestjs/swagger';
import { ContextType } from 'modules/users/domain/types';

export class UserDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  personalNumber: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ enum: ContextType })
  contextType: ContextType;
}
