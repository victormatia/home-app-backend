import { ApiError } from './ApiError';

export class InternalServerError extends ApiError{
  constructor(message: string) {
    super(message, 500);
  }
}