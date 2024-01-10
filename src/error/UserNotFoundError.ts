import { UserErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class UserNotFoundError extends ApiError{
  constructor() {
    super(UserErrors.USER_NOT_FOUND, 404);
  }
}