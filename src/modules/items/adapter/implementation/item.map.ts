import { UniqueEntityID } from 'shared/domain';

import { ItemDto } from 'modules/items/application/dto';
import { Item } from 'modules/items/domain';
import { ItemEntity } from 'modules/items/infrastructure';
import { UpdateItemDto } from 'modules/items/application/useCases/updateItem';

export class ItemMap {
  public static toDtoBulk(items: Item[]): ItemDto[] {
    return items.map((item) => this.toDto(item));
  }

  public static toDto(item: Item): ItemDto {
    return {
      itemId: item.itemId.toString(),
      name: item.name,
      vendor: item.vendor,
      imageUrl: item.imageUrl,
      type: item.type,
      category: item.category,
      subcategory: item.subcategory,
      description: item.description,
      parameters: item.parameters,
      quantity: item.quantity,
    };
  }

  public static toDomain(entity: ItemEntity): Item {
    return Item.create(
      {
        name: entity.name,
        vendor: entity.vendor,
        imageUrl: entity.image_url,
        type: entity.type,
        category: entity.category,
        subcategory: entity.subcategory,
        description: entity.description,
        parameters: entity.parameters,
        quantity: entity.quantity,
      },
      new UniqueEntityID(entity.item_id),
    );
  }

  public static dtoToDomain(dto: UpdateItemDto): Item {
    return Item.create(
      {
        name: dto.name,
        vendor: dto.vendor,
        imageUrl: dto.imageUrl,
        type: dto.type,
        category: dto.category,
        subcategory: dto.subcategory,
        description: dto.description,
        parameters: dto.parameters,
        quantity: dto.quantity,
      },
      new UniqueEntityID(dto.itemId),
    );
  }

  public static toPersistance(item: Item): Partial<ItemEntity> {
    return {
      item_id: item.itemId.toString(),
      name: item.name,
      vendor: item.vendor,
      image_url: item.imageUrl,
      type: item.type,
      category: item.category,
      subcategory: item.subcategory,
      description: item.description,
      parameters: item.parameters,
      quantity: item.quantity,
    };
  }
}
