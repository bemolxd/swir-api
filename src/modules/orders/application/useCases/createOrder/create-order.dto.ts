export class CreateOrderDto {
  senderId: string;
  techId: string;
  items: string[];
  senderComment: string;
  dateFrom: string;
  dateTo: string;
}
