import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { OrderStatus, SelectedItem } from '../domain/types';

@Entity('orders')
export class OrderEntity extends AbstractEntity {
  @PrimaryColumn()
  order_id: string;

  @Column('text', { nullable: true })
  tech_id: string;

  @Column()
  sender_id: string;

  @Column()
  status: OrderStatus;

  @Column('jsonb', { default: '[]' })
  items: SelectedItem[];

  @Column('text', { nullable: true })
  tech_comment: string;

  @Column('text', { nullable: true })
  sender_comment: string;

  @Column('text', { nullable: true })
  date_from: string;

  @Column('text', { nullable: true })
  date_to: string;

  @Column()
  is_public: boolean;

  @Column()
  is_rejected: boolean;

  @Column()
  is_archived: boolean;
}
