import { ApiProperty } from '@nestjs/swagger';
import { SelectedItem } from 'modules/orders/domain';

export class SubmitOrderDto {
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  techId: string;
  @ApiProperty({ type: [SelectedItem] })
  items: SelectedItem[];
  @ApiProperty({ nullable: true })
  senderComment: string | null;
  @ApiProperty()
  dateFrom: string;
  @ApiProperty()
  dateTo: string;
}

export class SubmitOrderBodyDto {
  @ApiProperty()
  techId: string;
  @ApiProperty({ type: [SelectedItem] })
  items: SelectedItem[];
  @ApiProperty({ nullable: true })
  senderComment: string | null;
  @ApiProperty()
  dateFrom: string;
  @ApiProperty()
  dateTo: string;
}
