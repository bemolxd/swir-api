import { OrdersCollectionQueryParams } from 'modules/orders/adapter';

export class GetUserDetailOrdersQuery {
  constructor(public readonly params: OrdersCollectionQueryParams) {}
}
