import { QueryListResult } from 'shared/core';

import { Order } from '../domain';
import { OrdersCollectionQueryParams } from './orders-collection.query-params';

export interface IOrderRepository {
  exists(orderId: string): Promise<boolean>;
  getOrderById(orderId: string): Promise<Order>;
  getAllOrders(
    params: OrdersCollectionQueryParams,
    senderId?: string,
    isArchived?: boolean,
  ): Promise<QueryListResult<Order>>;
  persist(order: Order): Promise<void>;
  updateOrder(order: Order): Promise<void>;
}
