import { ImmobileErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class ImmobileNotCreatedError extends ApiError {
  constructor() {
    super(ImmobileErrors.IMMOBILE_NOT_CREATED, 400);
  }
}