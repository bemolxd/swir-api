import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

export class GetUserOrdersQuery {
  constructor(public readonly params: OrdersCollectionQueryParams) {}
}
