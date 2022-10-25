import { ApiProperty } from '@nestjs/swagger';
import {
  ItemCategory,
  ItemSubcategory,
  ItemType,
} from 'modules/items/domain/types';

export class CreateItemDto {
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
  @ApiProperty({ nullable: true })
  subcategory: ItemSubcategory | null;
  @ApiProperty()
  description: string;
  @ApiProperty()
  parameters: string;
  @ApiProperty()
  quantity: number;
}
