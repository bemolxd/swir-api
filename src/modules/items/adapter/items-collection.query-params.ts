import { QueryParams } from 'shared/core';

import { ItemCategory, ItemType } from '../domain/types';

export interface ItemsCollectionQueryParams extends QueryParams {
  type?: ItemType;
  category?: ItemCategory;
}
