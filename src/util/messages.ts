export enum GenericErrors {
  UNKNOWN_ERROR = 'Something went wrong',
  SERVER_ERROR = 'Server error'
}

export enum UserErrors {
  USER_NOT_FOUND = 'User not found',
  USER_NOT_REGISTERED = 'Something went wrong, user was not registered',
  TOKEN_MALFORMED = 'Token may not contain correct payload'
}

export enum ImmobileErrors {
  IMMOBILE_NOT_CREATED = 'Something went wrong, new immobile was not registered', 
  ADDRESS_NOT_FOUND = 'Address with the given id does not exist',
  UPDATE_INFO_INCOMPLETE = 'ownerId, addressId, and typeId must be provided',
  IMMOBILE_NOT_FOUND = 'Immobile not found'
}

export enum UserSuccess {
  USER_DELETED = 'User deleted',
  USER_PURGED = 'User permanently deleted',
  USER_ACTIVATED = 'User activated'
}

export enum AuthorizationErrors {
  TOKEN_NOT_FOUND = 'Token not found',
  INVALID_TOKEN = 'Invalid token',
  ACCESS_FORBIDEN = 'Access not alowed',
  UNAUTHORIZED_ERROR = 'Access unauthorized'
}