import { Entity, UniqueEntityID } from 'shared/domain';

import { OrderId } from './order-id';
import { OrderStatus } from './types';

export interface OrderProps {
  techId: string;
  senderId: string;
  status: OrderStatus;
  items: string[];
  techComment: string;
  senderComment: string;
  dateFrom: string;
  dateTo: string;
  isPublic: boolean;
}

export class Order extends Entity<OrderProps> {
  get orderId() {
    return OrderId.create(this._id).id;
  }

  get techId() {
    return this.props.techId;
  }

  get senderId() {
    return this.props.senderId;
  }

  get status() {
    return this.props.status;
  }

  get items() {
    return this.props.items;
  }

  get techComment() {
    return this.props.techComment;
  }

  get senderComment() {
    return this.props.senderComment;
  }

  get dateFrom() {
    return this.props.dateFrom;
  }

  get dateTo() {
    return this.props.dateTo;
  }

  get isPublic() {
    return this.props.isPublic;
  }

  private constructor(props: OrderProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: OrderProps, id?: UniqueEntityID): Order {
    return new Order(props, id);
  }
}
