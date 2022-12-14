export class HttpException extends Error {
  private readonly _status: number;
  private readonly _data?: any;

  public constructor(message: string, status: number = 500, data?: any) {
    super(message);

    this._status = status;
    this._data = data;
  }

  public get status(): number {
    return this._status;
  }

  public get data(): any {
    return this._data;
  }
}
