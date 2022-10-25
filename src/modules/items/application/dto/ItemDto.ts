import { ApiProperty } from '@nestjs/swagger';
import {
  ItemCategory,
  ItemSubcategory,
  ItemType,
} from 'modules/items/domain/types';

export class ItemDto {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  vendor: string;
  @ApiProperty({ nullable: true })
  imageUrl: string | null;
  @ApiProperty({ enum: ItemType })
  type: ItemType;
  @ApiProperty({ enum: ItemCategory })
  category: ItemCategory;
  @ApiProperty()
  subcategory: ItemSubcategory | null;
  @ApiProperty()
  description: string;
  @ApiProperty()
  parameters: string;
  @ApiProperty()
  quantity: number;
}
