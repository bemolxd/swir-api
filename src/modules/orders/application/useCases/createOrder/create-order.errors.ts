import { UseCaseError } from 'shared/core';

export namespace CreateOrderErrors {
  export class OrderAlreadyExists extends UseCaseError {
    constructor() {
      super('Order already exists');
    }
  }

  export class ItemsNotAvailable extends UseCaseError {
    constructor(items: string | string[]) {
      super(`Items ${items} are not available`);
    }
  }
}
