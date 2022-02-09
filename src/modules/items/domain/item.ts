import { UniqueEntityID, Entity } from 'shared/domain';

import { ItemCategory, ItemSubcategory, ItemType } from './types';

import { ItemId } from './item-id';

export interface ItemProps {
  name: string;
  vendor: string;
  imageUrl: string | null;
  type: ItemType;
  category: ItemCategory;
  subcategory: ItemSubcategory | null;
  description: string;
  parameters: string;
  quantity: number;
}

export class Item extends Entity<ItemProps> {
  get itemId() {
    return ItemId.create(this._id).id;
  }

  get name() {
    return this.props.name;
  }

  get vendor() {
    return this.props.vendor;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get type() {
    return this.props.type;
  }

  get category() {
    return this.props.category;
  }

  get subcategory() {
    return this.props.subcategory;
  }

  get description() {
    return this.props.description;
  }

  get parameters() {
    return this.props.parameters;
  }

  get quantity() {
    return this.props.quantity;
  }

  private constructor(props: ItemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ItemProps, id?: UniqueEntityID): Item {
    return new Item(props, id);
  }
}
