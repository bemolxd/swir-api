import { InjectRepository } from '@nestjs/typeorm';
import { ItemMap, ItemRepository } from 'modules/items/adapter';
import { UseCase } from 'shared/core';

import { ItemDto } from '../../dto';
import { GetItemDto } from './get-item.dto';
import { GetItemErrors } from './get-item.errors';

export type GetItemResponse = ItemDto | GetItemErrors.ItemNotFoundError;

export class GetItemUseCase
  implements UseCase<GetItemDto, Promise<GetItemResponse>>
{
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: GetItemDto): Promise<GetItemResponse> {
    try {
      const item = await this.itemRepository.getItemById(dto.itemId);

      return ItemMap.toDto(item);
    } catch {
      return new GetItemErrors.ItemNotFoundError(dto.itemId);
    }
  }
}
