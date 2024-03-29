import { QueryListResult } from 'shared/core';

import { Order } from '../domain';
import { OrdersCollectionQueryParams } from './orders-collection.query-params';

export interface IOrderRepository {
  exists(orderId: string): Promise<boolean>;
  getOrderById(orderId: string): Promise<Order>;
  getAllOrders(
    params: OrdersCollectionQueryParams,
    isArchived?: boolean,
    isNotCompleting?: boolean,
  ): Promise<QueryListResult<Order>>;
  getUserDetailOrders(
    params: OrdersCollectionQueryParams,
  ): Promise<QueryListResult<Order>>;
  persist(order: Order): Promise<void>;
  updateOrder(order: Order): Promise<void>;
}
