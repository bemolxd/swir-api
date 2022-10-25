import { ApiProperty } from '@nestjs/swagger';
import { SelectedItem } from 'modules/orders/domain';

export class AddItemElementDto {
  @ApiProperty({ type: SelectedItem })
  item: SelectedItem;
}
