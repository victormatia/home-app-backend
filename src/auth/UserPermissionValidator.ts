import { PermissionValidator } from './PermissionValidator';

export class UserPermissionValidator extends PermissionValidator {
  validate() {
    return this._userId === this._tokenUserId;
  }
}