export class ApplicationError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly details?: any,
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}
