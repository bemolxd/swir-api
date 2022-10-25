import { UseCaseError } from 'shared/core';

export namespace RemoveItemElementErrors {
  export class OrderNotFoundError extends UseCaseError {
    constructor(orderId: string) {
      super(`Order with id ${orderId} does not exist`);
    }
  }
}
