import { Meta } from 'shared/core';

import { UserDto } from './UserDto';

export class UsersCollectionDto {
  collection: UserDto[];
  meta: Meta;
}
