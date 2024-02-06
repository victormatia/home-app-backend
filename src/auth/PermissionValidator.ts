export abstract class PermissionValidator {
  constructor(protected _userId:string, protected _tokenUserId: string) {
  }

  abstract validate(): boolean;
}