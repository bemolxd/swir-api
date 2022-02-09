import { Item } from '../domain';

export interface IItemRepository {
  exists(itemId: string): Promise<boolean>;
  getItemById(itemId: string): Promise<Item>;
  getAllItems(): Promise<Item[]>;
  persist(item: Item): Promise<void>;
}
