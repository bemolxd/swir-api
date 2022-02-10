import { InjectRepository } from '@nestjs/typeorm';
import { ItemMap, ItemRepository } from 'modules/items/adapter';
import { UseCase } from 'shared/core';
import { ItemDto } from '../../dto';
import { UpdateItemDto } from './update-item.dto';

export class UpdateItemUseCase
  implements UseCase<UpdateItemDto, Promise<ItemDto>>
{
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: UpdateItemDto): Promise<ItemDto> {
    const isExistingItem = await this.itemRepository.exists(dto.itemId);

    if (!isExistingItem) throw new Error('Item not found');

    const item = ItemMap.dtoToDomain(dto);

    await this.itemRepository.updateItem(item);

    return ItemMap.toDto(item);
  }
}
