import { ApiError } from './ApiError';

export class AccessForbidden extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}