import { Meta } from 'shared/core';

import { ItemDto } from './ItemDto';

export class ItemsCollectionDto {
  collection: ItemDto[];
  meta: Meta;
}
