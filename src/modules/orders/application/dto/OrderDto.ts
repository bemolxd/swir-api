import { OrderStatus } from 'modules/orders/domain';

export class OrderDto {
  orderId: string;
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
