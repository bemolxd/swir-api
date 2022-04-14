import { SelectedItem } from 'modules/orders/domain';

export class SubmitOrderDto {
  senderId: string;
  orderId: string;
  techId: string;
  items: SelectedItem[];
  senderComment: string | null;
  dateFrom: string;
  dateTo: string;
}

export class SubmitOrderBodyDto {
  techId: string;
  items: SelectedItem[];
  senderComment: string | null;
  dateFrom: string;
  dateTo: string;
}
