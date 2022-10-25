import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

export class GetUserArchivedOrdersQuery {
  constructor(public readonly params: OrdersCollectionQueryParams) {}
}
