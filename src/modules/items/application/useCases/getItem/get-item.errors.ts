import { UseCaseError } from 'shared/core';

export namespace GetItemErrors {
  export class ItemNotFoundError extends UseCaseError {
    constructor(itemId: string) {
      super(`Item with id ${itemId} does not exist`);
    }
  }
}
