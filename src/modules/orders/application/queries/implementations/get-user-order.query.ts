import { QueryParams } from 'shared/core';

export class GetUserOrdersQuery {
  constructor(
    public readonly params: QueryParams,
    public readonly senderId: string,
  ) {}
}
