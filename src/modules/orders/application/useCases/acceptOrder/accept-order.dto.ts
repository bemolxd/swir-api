import { ApiProperty } from '@nestjs/swagger';
import { SelectedItem } from 'modules/orders/domain';

export class AcceptOrderDto {
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  techId: string;
  @ApiProperty()
  dateFrom: string;
  @ApiProperty()
  dateTo: string;
  @ApiProperty({ type: [SelectedItem] })
  items: SelectedItem[];
  @ApiProperty({ nullable: true })
  techComment: string | null;
}

export class AcceptOrderBodyDto {
  @ApiProperty()
  techId: string;
  @ApiProperty()
  dateFrom: string;
  @ApiProperty()
  dateTo: string;
  @ApiProperty({ type: [SelectedItem] })
  items: SelectedItem[];
  @ApiProperty({ nullable: true })
  techComment: string | null;
}
