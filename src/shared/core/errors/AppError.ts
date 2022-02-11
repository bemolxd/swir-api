import { UnknownError } from './UnknownError';

export namespace AppError {
  export class UnexpectedError extends UnknownError {
    constructor(error: any) {
      super('Unexpected server error', error);

      console.log('APP ERROR');
      console.error(error);
    }
  }
}
