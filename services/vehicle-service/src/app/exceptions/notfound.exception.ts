import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
    public constructor(message: string, data?: any)
    {
        super(message, 404, data);
    }
}