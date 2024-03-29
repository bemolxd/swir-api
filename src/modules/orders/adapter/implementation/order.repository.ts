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

  async getAllOrders(
    {
      limit = 10,
      offset = 0,
      senderId = '',
      search = '',
      techId = '',
    }: OrdersCollectionQueryParams,
    isArchived = false,
    isNotCompleting = false,
  ): Promise<QueryListResult<Order>> {
    const query = this.createPaginatedQueryBuilder('orders', {
      limit,
      offset,
    }).where(`orders.sender_id ilike '%${senderId}%'`);

    if (techId) {
      query.where(`orders.tech_id ilike '%${techId}%'`);
    }

    if (search) {
      query.where(`orders.order_doc ilike '%${search}%'`);
    }

    const [collection, total] = await query
      .andWhere(`orders.is_archived = ${isArchived}`)
      .andWhere(
        `orders.status not ilike '%${isNotCompleting && 'completing'}%'`,
      )
      .orderBy('orders.updatedAt', 'DESC')
      .getManyAndCount();

    return {
      collection: OrderMap.toDomainBulk(collection),
      meta: {
        limit,
        offset,
        total,
      },
    };
  }

  async getUserDetailOrders({
    limit,
    offset,
    senderId = '',
    techId = '',
    search = '',
  }: OrdersCollectionQueryParams): Promise<QueryListResult<Order>> {
    const query = this.createPaginatedQueryBuilder('orders', { limit, offset });

    const [collection, total] = await query
      .where(`orders.sender_id ilike '%${senderId}%'`)
      .andWhere(`orders.tech_id ilike '%${techId}%'`)
      .andWhere(`orders.status != 'completing'`)
      .andWhere(`orders.order_doc ilike '%${search}%'`)
      .orderBy('orders.updatedAt', 'DESC')
      .getManyAndCount();

    return {
      collection: OrderMap.toDomainBulk(collection),
      meta: {
        limit,
        offset,
        total,
      },
    };
  }

  async updateOrder(order: Order): Promise<void> {
    const existingOrder = await this.exists(order.orderId.toString());

    if (!existingOrder) throw new Error('Order not found');

    const orderEntity = OrderMap.toPersistence(order);

    await this.save(orderEntity);
  }

  async persist(order: Order): Promise<void> {
    const existingOrder = await this.exists(order.orderId.toString());

    if (!!existingOrder) throw new Error('Order already exists');

    const orderEntity = OrderMap.toPersistence(order);

    await this.create(orderEntity).save();
  }
}
