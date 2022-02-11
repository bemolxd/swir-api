import { UseCaseError } from 'shared/core';

export namespace CreateItemErrors {
  export class ItemAlreadyExists extends UseCaseError {
    constructor() {
      super('Item already exists');
    }
  }
}
