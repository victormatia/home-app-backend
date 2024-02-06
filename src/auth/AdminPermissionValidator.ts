import { PermissionValidator } from './PermissionValidator';

export class AdminPermissionValidator extends PermissionValidator {
  validate() {
    return true;
  }
}