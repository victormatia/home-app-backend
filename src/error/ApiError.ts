export abstract class ApiError extends Error{
  
  constructor(message: string, private _status: number) {
    super(message);
  }

  public get status(): number {
    return this._status;
  }


}