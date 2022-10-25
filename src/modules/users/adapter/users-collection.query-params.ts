import { QueryParams } from 'shared/core';

import { ContextType } from '../domain/types';

export interface UsersCollectionQueryParams extends QueryParams {
  contextType?: ContextType;
}
