import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import { ItemMap, ItemRepository } from 'modules/items/adapter';
import { ItemDto } from '../../dto';

export class GetItemsUseCase implements UseCase<undefined, Promise<ItemDto[]>> {
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(): Promise<ItemDto[]> {
    const items = await this.itemRepository.getAllItems();

    return ItemMap.toDtoBulk(items);
  }
}
