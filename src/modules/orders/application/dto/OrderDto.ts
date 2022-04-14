import { OrderStatus, SelectedItem } from 'modules/orders/domain';

export class OrderDto {
  orderId: string;
  techId: string;
  senderId: string;
  status: OrderStatus;
  items: SelectedItem[];
  techComment: string;
  senderComment: string;
  dateFrom: string;
  dateTo: string;
  isPublic: boolean;
}
