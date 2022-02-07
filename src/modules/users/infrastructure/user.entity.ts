import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { AbstractEntity } from 'shared/core';

@Entity('users')
@Unique(['personal_number'])
export class UserEntity extends AbstractEntity {
  @PrimaryColumn()
  user_id: string;

  @Column()
  personal_number: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  context_type: string;
}
