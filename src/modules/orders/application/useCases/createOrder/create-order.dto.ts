import { ApiProperty } from '@nestjs/swagger';
import { SelectedItem } from 'modules/orders/domain';

export class CreateOrderDto {
  @ApiProperty()
  senderId: string;
  @ApiProperty({ type: [SelectedItem] })
  items: SelectedItem[];
}
