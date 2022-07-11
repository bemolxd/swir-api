import { SelectedItem } from 'modules/orders/domain';

export class AcceptOrderDto {
  orderId: string;
  techId: string;
  dateFrom: string;
  dateTo: string;
  items: SelectedItem[];
  techComment: string | null;
}

export class AcceptOrderBodyDto {
  techId: string;
  dateFrom: string;
  dateTo: string;
  items: SelectedItem[];
  techComment: string | null;
}
