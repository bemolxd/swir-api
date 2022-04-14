import { GetOrderHandler } from './get-order.handler';
import { GetOrdersHandler } from './get-orders.handler';
import { GetUserOrdersHandler } from './get-user-orders.hander';

export const QueryHandlers = [
  GetOrdersHandler,
  GetOrderHandler,
  GetUserOrdersHandler,
];
