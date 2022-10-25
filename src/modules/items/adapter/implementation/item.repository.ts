import { EntityRepository } from 'typeorm';

import { BaseRepository, QueryListResult } from 'shared/core';

import { ItemEntity } from 'modules/items/infrastructure';
import { Item } from 'modules/items/domain';

import { IItemRepository } from '../item-repository';
import { ItemMap } from './item.map';
import { ItemsCollectionQueryParams } from '../items-collection.query-params';

@EntityRepository(ItemEntity)
export class ItemRepository
  extends BaseRepository<ItemEntity>
  implements IItemRepository
{
  async exists(itemId: string): Promise<boolean> {
    const item = await this.findOne({ item_id: itemId });

    return !!item;
  }

  async getItemById(itemId: string): Promise<Item> {
    const item = await this.findOne({ item_id: itemId });

    if (!item) throw new Error('Item not found');

    return ItemMap.toDomain(item);
  }

  async getAllItems({
    limit = 10,
    offset = 0,
    type,
    category,
    search = '',
  }: ItemsCollectionQueryParams): Promise<QueryListResult<Item>> {
    const query = this.createPaginatedQueryBuilder('items', {
      limit,
      offset,
    })
      .where(`items.name ilike '%${search}%'`)
      .orderBy('items.updatedAt', 'DESC');

    if (type) {
      query.where(`items.type in (:...type)`, {
        type: type.split(','),
      });
    }

    if (category) {
      query.where(`items.category in (:...category)`, {
        category: category.split(','),
      });
    }

    const [collection, total] = await query.getManyAndCount();

    return {
      collection: ItemMap.toDomainBulk(collection),
      meta: {
        limit,
        offset,
        total,
      },
    };
  }

  async updateItem(item: Item): Promise<void> {
    const existingItem = await this.exists(item.itemId.toString());

    if (!existingItem) throw new Error('Item not found');

    const itemEntity = ItemMap.toPersistance(item);

    await this.save(itemEntity);
  }

  async removeItem(itemId: string): Promise<void> {
    const result = await this.delete({ item_id: itemId });

    if (result.affected === 0) throw new Error('Item not found');
  }

  async persist(item: Item): Promise<void> {
    const existingItem = await this.exists(item.itemId.toString());

    if (!!existingItem) throw new Error('Item already exists!');

    const itemEntity = ItemMap.toPersistance(item);

    await this.create(itemEntity).save();
  }
}
