import { GetArchivedOrdersHandler } from './get-archived-orders.handler';
import { GetOrderHandler } from './get-order.handler';
import { GetOrdersHandler } from './get-orders.handler';
import { GetUserArchivedOrdersHandler } from './get-user-archived-orders.handler';
import { GetUserDetailOrdersHandler } from './get-user-detail-orders.handler';
import { GetUserOrdersHandler } from './get-user-orders.hander';

export const QueryHandlers = [
  GetOrdersHandler,
  GetOrderHandler,
  GetUserOrdersHandler,
  GetArchivedOrdersHandler,
  GetUserDetailOrdersHandler,
  GetUserArchivedOrdersHandler,
];
