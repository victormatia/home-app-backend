import { ApiError } from './ApiError';

export class AccessUnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}