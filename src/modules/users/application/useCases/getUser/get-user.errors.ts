import { UseCaseError } from 'shared/core';

export namespace GetUserErrors {
  export class UserNotFoundError extends UseCaseError {
    constructor(userId: string) {
      super(`User with id ${userId} does not exist`);
    }
  }
}
