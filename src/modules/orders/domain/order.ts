import { Entity, UniqueEntityID } from 'shared/domain';

import { OrderId } from './order-id';
import { OrderStatus, SelectedItem } from './types';

export interface OrderProps {
  techId: string | null;
  senderId: string;
  status: OrderStatus;
  items: SelectedItem[];
  techComment: string | null;
  senderComment: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  isPublic: boolean;
  isRejected: boolean;
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

  get isRejected() {
    return this.props.isRejected;
  }

  private constructor(props: OrderProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: OrderProps, id?: UniqueEntityID): Order {
    return new Order(props, id);
  }
}
