import { ImmobileErrors } from '../util/messages';
import { ApiError } from './ApiError';

export class ImmobileIncompleteInfoError extends ApiError {
  constructor() {
    super(ImmobileErrors.UPDATE_INFO_INCOMPLETE, 400);
  }
}