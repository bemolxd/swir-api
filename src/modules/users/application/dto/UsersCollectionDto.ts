import { ApiProperty } from '@nestjs/swagger';
import { Meta } from 'shared/core';

import { UserDto } from './UserDto';

export class UsersCollectionDto {
  @ApiProperty({ type: [UserDto] })
  collection: UserDto[];
  @ApiProperty({ type: Meta })
  meta: Meta;
}
