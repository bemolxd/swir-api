import { SelectedItem } from 'modules/orders/domain';

export class CreateOrderDto {
  senderId: string;
  items: SelectedItem[];
}
