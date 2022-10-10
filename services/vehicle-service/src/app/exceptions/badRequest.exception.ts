import { HttpException } from "./http.exception";

export class BadRequestException extends HttpException {
  public constructor(message: string, data?: any) {
    super(message, 400, data);
  }
}
