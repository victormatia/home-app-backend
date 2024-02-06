import { AuthorizationErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class InvalidTokenError extends ApiError{
  constructor() {
    super(AuthorizationErrors.INVALID_TOKEN, 401);
  }
}