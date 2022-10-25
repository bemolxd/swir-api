import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, SelectedItem } from 'modules/orders/domain';

export class OrderDto {
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  orderDoc: string;
  @ApiProperty()
  techId: string;
  @ApiProperty()
  senderId: string;
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;
  @ApiProperty({ type: [SelectedItem] })
  items: SelectedItem[];
  @ApiProperty()
  techComment: string;
  @ApiProperty()
  senderComment: string;
  @ApiProperty()
  dateFrom: string;
  @ApiProperty()
  dateTo: string;
  @ApiProperty()
  isPublic: boolean;
  @ApiProperty()
  isRejected: boolean;
  @ApiProperty()
  isArchived: boolean;
}
