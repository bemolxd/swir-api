import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  limit: number;
  @ApiProperty()
  offset: number;
  @ApiProperty()
  total: number;
}
