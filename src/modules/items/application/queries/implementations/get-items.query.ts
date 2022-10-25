import { ItemsCollectionQueryParams } from 'modules/items/adapter';

export class GetItemsQuery {
  constructor(public readonly params: ItemsCollectionQueryParams) {}
}
