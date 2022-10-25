import { CreateItemDto } from '../createItem';

export class UpdateItemDto extends CreateItemDto {
  itemId: string;
}
