import { UniqueEntityID } from 'shared/domain';

import { OrderDto } from 'modules/orders/application';
import { Order } from 'modules/orders/domain';
import { OrderEntity } from 'modules/orders/infrastructure';

export class OrderMap {
  public static toDtoBulk(orders: Order[]): OrderDto[] {
    return orders.map((order) => this.toDto(order));
  }

  public static toDto(order: Order): OrderDto {
    return {
      orderId: order.orderId.toString(),
      orderDoc: order.orderDoc,
      techId: order.techId,
      senderId: order.senderId,
      status: order.status,
      items: order.items,
      techComment: order.techComment,
      senderComment: order.senderComment,
      dateFrom: order.dateFrom,
      dateTo: order.dateTo,
      isPublic: order.isPublic,
      isRejected: order.isRejected,
      isArchived: order.isArchived,
    };
  }

  public static toDomainBulk(entities: OrderEntity[]): Order[] {
    return entities.map((entity) =>
      Order.create(
        {
          orderDoc: entity.order_doc,
          techId: entity.tech_id,
          senderId: entity.sender_id,
          status: entity.status,
          items: entity.items,
          techComment: entity.tech_comment,
          senderComment: entity.sender_comment,
          dateFrom: entity.date_from,
          dateTo: entity.date_to,
          isPublic: entity.is_public,
          isRejected: entity.is_rejected,
          isArchived: entity.is_archived,
        },
        new UniqueEntityID(entity.order_id),
      ),
    );
  }

  public static toDomain(entity: OrderEntity): Order {
    return Order.create(
      {
        orderDoc: entity.order_doc,
        techId: entity.tech_id,
        senderId: entity.sender_id,
        status: entity.status,
        items: entity.items,
        techComment: entity.tech_comment,
        senderComment: entity.sender_comment,
        dateFrom: entity.date_from,
        dateTo: entity.date_to,
        isPublic: entity.is_public,
        isRejected: entity.is_rejected,
        isArchived: entity.is_archived,
      },
      new UniqueEntityID(entity.order_id),
    );
  }

  public static dtoToDomain(dto: OrderDto): Order {
    return Order.create(
      {
        orderDoc: dto.orderDoc,
        techId: dto.techId,
        senderId: dto.senderId,
        status: dto.status,
        items: dto.items,
        techComment: dto.techComment,
        senderComment: dto.senderComment,
        dateFrom: dto.dateFrom,
        dateTo: dto.dateTo,
        isPublic: dto.isPublic,
        isRejected: dto.isRejected,
        isArchived: dto.isArchived,
      },
      new UniqueEntityID(dto.orderId),
    );
  }

  public static toPersistence(order: Order): Partial<OrderEntity> {
    return {
      order_id: order.orderId.toString(),
      order_doc: order.orderDoc,
      tech_id: order.techId,
      sender_id: order.senderId,
      status: order.status,
      items: order.items,
      tech_comment: order.techComment,
      sender_comment: order.senderComment,
      date_from: order.dateFrom,
      date_to: order.dateTo,
      is_public: order.isPublic,
      is_rejected: order.isRejected,
      is_archived: order.isArchived,
    };
  }
}
