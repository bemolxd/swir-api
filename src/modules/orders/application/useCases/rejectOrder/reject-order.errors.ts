import { UseCaseError } from 'shared/core';

export namespace RejectOrderErrors {
  export class OrderNotFound extends UseCaseError {
    constructor(orderId: string) {
      super(`Order with id ${orderId} does not exist`);
    }
  }
}
