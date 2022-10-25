import { ApiProperty } from '@nestjs/swagger';

export class FinishOrderDto {
  @ApiProperty()
  orderId: string;
  @ApiProperty({ nullable: true })
  techComment: string | null;
}

export class FinishOrderBodyDto {
  @ApiProperty({ nullable: true, required: false })
  techComment: string | null;
}
