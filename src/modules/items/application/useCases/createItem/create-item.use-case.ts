import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';

import { ItemMap, ItemRepository } from 'modules/items/adapter';
import { Item } from 'modules/items/domain';

import { ItemDto } from '../../dto';
import { CreateItemDto } from './create-item.dto';

export class CreateItemUseCase
  implements UseCase<CreateItemDto, Promise<ItemDto>>
{
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: CreateItemDto): Promise<ItemDto> {
    const newItem = Item.create({
      name: dto.name,
      vendor: dto.vendor,
      imageUrl: dto.imageUrl,
      type: dto.type,
      category: dto.category,
      subcategory: dto.subcategory,
      description: dto.description,
      parameters: dto.parameters,
      quantity: dto.quantity,
    });

    await this.itemRepository.persist(newItem);

    return ItemMap.toDto(newItem);
  }
}
