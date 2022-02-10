import { EntityRepository, Repository } from 'typeorm';

import { ItemEntity } from 'modules/items/infrastructure';
import { Item } from 'modules/items/domain';

import { IItemRepository } from '../item-repository';
import { ItemMap } from './item.map';

@EntityRepository(ItemEntity)
export class ItemRepository
  extends Repository<ItemEntity>
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

  async getAllItems(): Promise<Item[]> {
    const items = await this.find();

    return items.map((item) => ItemMap.toDomain(item));
  }

  async updateItem(item: Item): Promise<void> {
    const existingItem = await this.exists(item.itemId.toString());

    if (!existingItem) throw new Error('Item not found');

    const itemEntity = ItemMap.toPersistance(item);

    await this.save(itemEntity);
  }

  async persist(item: Item): Promise<void> {
    const existingItem = await this.exists(item.itemId.toString());

    if (!!existingItem) return;

    const itemEntity = ItemMap.toPersistance(item);

    await this.create(itemEntity).save();
  }
}
