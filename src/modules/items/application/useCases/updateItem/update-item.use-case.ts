import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import { ItemMap, ItemRepository } from 'modules/items/adapter';

import { ItemDto } from '../../dto';
import { UpdateItemDto } from './update-item.dto';
import { UpdateItemErrors } from './update-item.errors';

export type UpdateItemResponse = ItemDto | UpdateItemErrors.ItemNotFoundError;

export class UpdateItemUseCase
  implements UseCase<UpdateItemDto, Promise<UpdateItemResponse>>
{
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: UpdateItemDto): Promise<UpdateItemResponse> {
    const item = ItemMap.dtoToDomain(dto);

    try {
      await this.itemRepository.updateItem(item);

      return ItemMap.toDto(item);
    } catch (error) {
      return new UpdateItemErrors.ItemNotFoundError(dto.itemId);
    }
  }
}
