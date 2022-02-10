import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from 'modules/items/adapter';
import { UseCase } from 'shared/core';
import { RemoveItemDto } from './remove-item.dto';

export class RemoveItemUseCase implements UseCase<RemoveItemDto, Promise<any>> {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(dto: RemoveItemDto): Promise<any> {
    await this.itemRepository.removeItem(dto.itemId);

    return;
  }
}
