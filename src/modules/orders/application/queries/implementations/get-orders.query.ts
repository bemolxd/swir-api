import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

export class GetOrdersQuery {
  constructor(public readonly params: OrdersCollectionQueryParams) {}
}
