import { ImmobileErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class AddressNotFoundError extends ApiError{
  constructor() {
    super(ImmobileErrors.ADDRESS_NOT_FOUND, 404);
  }
}