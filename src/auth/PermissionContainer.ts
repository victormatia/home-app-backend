import { AdminPermissionValidator } from './AdminPermissionValidator';
import { PermissionEnum } from './PermissionEnum';
import { PermissionValidator } from './PermissionValidator';
import { UserPermissionValidator } from './UserPermissionValidator';

export class PermissionContainer {
  
  private _permissionMap: Map<PermissionEnum, PermissionValidator> = new Map();
  
  constructor(userId: string, tokenUserId: string) {
    this.addPermissionValidator(PermissionEnum.ADMIN, new AdminPermissionValidator(userId, tokenUserId));
    this.addPermissionValidator(PermissionEnum.USER, new UserPermissionValidator(userId, tokenUserId));
    // this.addPermissionValidator(PermissionEnum.ADMIN, ImmobilePermissionValidator); 
  }

  private addPermissionValidator(permission: PermissionEnum, validator: PermissionValidator) {
    this._permissionMap.set(permission, validator);
  }

  useValidator(permission: PermissionEnum): boolean {
    return this._permissionMap.get(permission)?.validate() || false;
  }

}