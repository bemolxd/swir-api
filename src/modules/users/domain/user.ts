import { Entity, UniqueEntityID } from 'shared/domain';

import { ContextType } from './types';

import { UserId } from './user-id';

export interface UserProps {
  personalNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  contextType: ContextType;
}

export class User extends Entity<UserProps> {
  get userId() {
    return UserId.create(this._id).id;
  }

  get personalNumber() {
    return this.props.personalNumber;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get contextType() {
    //TODO: contextType logic
    return ContextType.USER;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id);
  }
}
