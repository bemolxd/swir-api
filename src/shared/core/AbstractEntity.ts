import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
