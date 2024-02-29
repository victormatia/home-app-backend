export abstract class PermissionValidator {
  constructor(protected _id?:string, protected _tokenUserId?: string) {
  }

  abstract validate(): boolean;
}