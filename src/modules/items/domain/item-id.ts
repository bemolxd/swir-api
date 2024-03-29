import { Entity, UniqueEntityID } from 'shared/domain';

export class ItemId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): ItemId {
    return new ItemId(id);
  }
}
