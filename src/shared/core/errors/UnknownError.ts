interface IUnknownError {
  message: string;
  error: any;
}

export abstract class UnknownError implements IUnknownError {
  constructor(
    readonly message: string,
    readonly error: any,
    private readonly statuCode = 500,
  ) {
    this.statuCode = statuCode;
    this.message = message;
    this.error = error;
  }
}
