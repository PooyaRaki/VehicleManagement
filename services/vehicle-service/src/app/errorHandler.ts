import { Request, Response } from "express";

export const errorHandler = (err: any, _: Request, res: Response, next: Function) => {
    if (res.headersSent) {
        return next(err)
      }

    res.status(err.status).json({
        status: err.status,
        message: err.message,
    });
}