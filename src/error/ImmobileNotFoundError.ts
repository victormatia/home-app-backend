import { ImmobileErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class ImmobileNotFoundError extends ApiError {
  constructor() {
    super(ImmobileErrors.IMMOBILE_NOT_FOUND, 404);
  }
}