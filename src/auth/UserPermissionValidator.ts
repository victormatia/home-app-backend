import { PermissionValidator } from './PermissionValidator';

export class UserPermissionValidator extends PermissionValidator {
  validate() {
    return this._id === this._tokenUserId;
  }
}