import { InjectRepository } from '@nestjs/typeorm';

import { UseCase } from 'shared/core';

import { ItemMap, ItemRepository } from 'modules/items/adapter';
import { Item } from 'modules/items/domain';

import { ItemDto } from '../../dto';
import { CreateItemDto } from './create-item.dto';
import { CreateItemErrors } from './create-item.errors';

export type CreateItemResponse = ItemDto | CreateItemErrors.ItemAlreadyExists;

export class CreateItemUseCase
  implements UseCase<CreateItemDto, Promise<CreateItemResponse>>
{
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: CreateItemDto): Promise<CreateItemResponse> {
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

    try {
      await this.itemRepository.persist(newItem);
    } catch {
      return new CreateItemErrors.ItemAlreadyExists();
    }

    return ItemMap.toDto(newItem);
  }
}
