import { EntityRepository } from 'typeorm';

import { BaseRepository, QueryListResult } from 'shared/core';

import { OrderEntity } from 'modules/orders/infrastructure';
import { Order } from 'modules/orders/domain';

import { OrderMap } from './order.map';
import { IOrderRepository } from '../order-repository';
import { OrdersCollectionQueryParams } from '../orders-collection.query-params';

@EntityRepository(OrderEntity)
export class OrderRepository
  extends BaseRepository<OrderEntity>
  implements IOrderRepository
{
  async exists(orderId: string): Promise<boolean> {
    const order = await this.findOne({ order_id: orderId });

    return !!order;
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.findOne({ order_id: orderId });

    if (!order) throw new Error('Order not found');

    return OrderMap.toDomain(order);
  }

  async getAllOrders({
    limit = 10,
    offset = 0,
  }: OrdersCollectionQueryParams): Promise<QueryListResult<Order>> {
    const query = this.createPaginatedQueryBuilder('orders', {
      limit,
      offset,
    });

    const [collection, total] = await query.getManyAndCount();

    return {
      collection: OrderMap.toDomainBulk(collection),
      meta: {
        limit,
        offset,
        total,
      },
    };
  }

  async updateItem(order: Order): Promise<void> {
    const existingOrder = await this.exists(order.orderId.toString());

    if (!existingOrder) throw new Error('Order not found');

    const orderEntity = OrderMap.toPersistence(order);

    await this.save(orderEntity);
  }

  async persist(order: Order): Promise<void> {
    const existingOrder = await this.exists(order.orderId.toString());

    if (!existingOrder) throw new Error('Order not found');

    const orderEntity = OrderMap.toPersistence(order);

    await this.create(orderEntity).save();
  }
}