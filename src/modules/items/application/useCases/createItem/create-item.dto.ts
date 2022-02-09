import {
  ItemCategory,
  ItemSubcategory,
  ItemType,
} from 'modules/items/domain/types';

export class CreateItemDto {
  name: string;
  vendor: string;
  imageUrl: string | null;
  type: ItemType;
  category: ItemCategory;
  subcategory: ItemSubcategory | null;
  description: string;
  parameters: string;
  quantity: number;
}
