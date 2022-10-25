import { QueryListResult } from 'shared/core';

import { Item } from '../domain';
import { ItemsCollectionQueryParams } from './items-collection.query-params';

export interface IItemRepository {
  exists(itemId: string): Promise<boolean>;
  getItemById(itemId: string): Promise<Item>;
  getAllItems(
    params: ItemsCollectionQueryParams,
  ): Promise<QueryListResult<Item>>;
  persist(item: Item): Promise<void>;
  updateItem(item: Item): Promise<void>;
  removeItem(itemId: string): Promise<void>;
}
