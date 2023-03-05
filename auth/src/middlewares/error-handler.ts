import { Request, Response, NextFunction } from 'express';
import {
  CustomError,
  DatabaseConnectionError,
  RequestValidationError
} from '../types/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  console.log(err);

  return res
    .status(500)
    .json({ errors: [{ message: 'Something went wrong' }] });
};
