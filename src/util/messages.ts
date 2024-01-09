export enum GenericErrors {
  UNKNOWN_ERROR = 'Something went wrong'
}

export enum UserErrors {
  USER_NOT_FOUND = 'User does not exist'
}

export enum ImmobileErrors {
  IMMOBILE_NOT_CREATED = 'Something went wrong, new immobile was not registered', 
  ADDRESS_NOT_FOUND = 'Address with the given id does not exist',
  UPDATE_INFO_INCOMPLETE = 'ownerId, addressId, and typeId must be provided'
}

export enum UserSuccess {
  USER_DELETED = 'User deleted',
  USER_PURGED = 'User permanently deleted',
  USER_ACTIVATED = 'User activated'
}