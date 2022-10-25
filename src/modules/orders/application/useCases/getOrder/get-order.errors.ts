import { UseCaseError } from 'shared/core';

export namespace GetOrderErrors {
  export class OrderNotFoundError extends UseCaseError {
    constructor(orderId: string) {
      super(`Order with id ${orderId} does not exist`);
    }
  }
}
