import { InjectRepository } from '@nestjs/typeorm';
import { ItemMap, ItemRepository } from 'modules/items/adapter';
import { UseCase } from 'shared/core';

import { ItemDto } from '../../dto';
import { GetItemDto } from './get-item.dto';

export class GetItemUseCase implements UseCase<GetItemDto, Promise<ItemDto>> {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: GetItemDto): Promise<ItemDto> {
    const item = await this.itemRepository.getItemById(dto.itemId);

    return ItemMap.toDto(item);
  }
}
