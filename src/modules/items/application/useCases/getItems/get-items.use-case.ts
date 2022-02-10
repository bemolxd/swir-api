import { InjectRepository } from '@nestjs/typeorm';
import { UseCase } from 'shared/core';

import {
  ItemMap,
  ItemRepository,
  ItemsCollectionQueryParams,
} from 'modules/items/adapter';
import { ItemsCollectionDto } from '../../dto';

export class GetItemsUseCase
  implements UseCase<undefined, Promise<ItemsCollectionDto>>
{
  constructor(
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
  ) {}

  async execute(
    params: ItemsCollectionQueryParams,
  ): Promise<ItemsCollectionDto> {
    const items = await this.itemRepository.getAllItems(params);

    return {
      collection: ItemMap.toDtoBulk(items.collection),
      meta: items.meta,
    };
  }
}
