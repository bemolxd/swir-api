import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractEntity } from 'shared/core';

import { OrderStatus } from '../domain/types';

@Entity('orders')
export class OrderEntity extends AbstractEntity {
  @PrimaryColumn()
  order_id: string;

  @Column()
  tech_id: string;

  @Column()
  sender_id: string;

  @Column()
  status: OrderStatus;

  @Column('text', { array: true })
  items: string[];

  @Column('text')
  tech_comment: string;

  @Column('text')
  sender_comment: string;

  @Column()
  date_from: string;

  @Column()
  date_to: string;

  @Column()
  is_public: boolean;
}
