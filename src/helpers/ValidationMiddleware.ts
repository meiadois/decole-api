import { ErrorHandler } from './ErrorHandler'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import express = require('express')

export default function ValidationMiddleware<T> (type: any, skipMissingProperties = false): express.RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ')
          next(new ErrorHandler(400, message))
        } else {
          next()
        }
      })
  }
}
