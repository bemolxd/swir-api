import { Entity, UniqueEntityID } from 'shared/domain';

export class OrderId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): OrderId {
    return new OrderId(id);
  }
}
