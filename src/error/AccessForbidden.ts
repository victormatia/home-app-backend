import { AuthorizationErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class AccessForbidden extends ApiError {
  constructor() {
    super(AuthorizationErrors.ACCESS_FORBIDEN, 403);
  }
}