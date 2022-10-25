import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from 'modules/items/adapter';
import { UseCase } from 'shared/core';
import { RemoveItemDto } from './remove-item.dto';
import { RemoveItemErrors } from './remove-item.errors';

export type RemoveItemResponse = void | RemoveItemErrors.ItemNotFoundError;

export class RemoveItemUseCase
  implements UseCase<RemoveItemDto, Promise<RemoveItemResponse>>
{
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: RemoveItemDto): Promise<RemoveItemResponse> {
    try {
      await this.itemRepository.removeItem(dto.itemId);

      return;
    } catch (error) {
      return new RemoveItemErrors.ItemNotFoundError(dto.itemId);
    }
  }
}
