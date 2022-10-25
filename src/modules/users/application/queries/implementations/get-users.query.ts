import { UsersCollectionQueryParams } from 'modules/users/adapter';

export class GetUsersQuery {
  constructor(public readonly params: UsersCollectionQueryParams) {}
}
