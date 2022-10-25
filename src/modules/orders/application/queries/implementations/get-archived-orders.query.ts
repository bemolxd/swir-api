import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

export class GetArchivedOrdersQuery {
  constructor(public readonly params: OrdersCollectionQueryParams) {}
}
