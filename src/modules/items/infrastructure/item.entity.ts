import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { ItemCategory, ItemSubcategory, ItemType } from '../domain/types';

@Entity('items')
export class ItemEntity extends AbstractEntity {
  @PrimaryColumn()
  item_id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  vendor: string;

  @Column('text', { nullable: true })
  image_url: string;

  @Column()
  type: ItemType;

  @Column()
  category: ItemCategory;

  @Column({ nullable: true })
  subcategory: ItemSubcategory;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  parameters: string;

  @Column()
  quantity: number;
}
