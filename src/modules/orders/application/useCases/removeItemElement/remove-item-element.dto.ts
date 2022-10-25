import { ApiProperty } from '@nestjs/swagger';

export class RemoveItemElementDto {
  @ApiProperty()
  itemId: string;
}
