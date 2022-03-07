import { Meta } from 'shared/core';

import { OrderDto } from './OrderDto';

export class OrdersCollectionDto {
  collection: OrderDto[];
  meta: Meta;
}
