import { ApiProperty } from '@nestjs/swagger';
import { Meta } from 'shared/core';

import { OrderDto } from './OrderDto';

export class OrdersCollectionDto {
  @ApiProperty({ type: [OrderDto] })
  collection: OrderDto[];
  @ApiProperty({ type: Meta })
  meta: Meta;
}
