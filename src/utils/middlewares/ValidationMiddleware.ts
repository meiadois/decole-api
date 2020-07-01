import CustomError from '../CustomError'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import express, { Request, Response, NextFunction } from 'express'

export default function ValidationMiddleware<T> (type: any, skipMissingProperties = false): express.RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ')
          next(new CustomError(400, message))
        } else {
          next()
        }
      })
  }
}
