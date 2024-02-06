import { UserErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class UserNotRegisteredError extends ApiError{
  constructor() {
    super(UserErrors.USER_NOT_REGISTERED, 400);
  }
} 