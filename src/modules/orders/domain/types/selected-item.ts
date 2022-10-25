import { ApiProperty } from '@nestjs/swagger';

export class SelectedItem {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  quantity: number;
}
