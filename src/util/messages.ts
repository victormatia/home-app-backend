export enum GenericErrors {
  UNKNOWN_ERROR = 'Something went wrong',
  SERVER_ERROR = 'Server error'
}

export enum UserErrors {
  USER_NOT_FOUND = 'User not found',
  USER_NOT_REGISTERED = 'Something went wrong, user was not registered'
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