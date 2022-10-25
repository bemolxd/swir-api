import { ApiProperty } from '@nestjs/swagger';
import { Meta } from 'shared/core';

import { ItemDto } from './ItemDto';

export class ItemsCollectionDto {
  @ApiProperty({ type: [ItemDto] })
  collection: ItemDto[];
  @ApiProperty({ type: Meta })
  meta: Meta;
}
