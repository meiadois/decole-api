// const Logger = require('../services/Logger');
import { Request, Response, NextFunction } from 'express'
import Logger from '../services/Logger'

export class ErrorHandler extends Error {
    public statusCode: number;
    public message: string;
    constructor (statusCode: number, message: string) {
      super(message)
      this.statusCode = statusCode
      this.message = message
    }
}
/*
export const HandleErrorMiddleware = function (err: unknown, res: Response): void {
  if (err instanceof ErrorHandler) {
    let { statusCode, message } = err
    if (message === '') {
      switch (statusCode) {
        case 500:
          message = 'Algo deu errado... tente novamente em alguns minutos.'
          break
        case 400:
          message = 'Há parâmetros obrigatórios mal preenchidos.'
          break
        case 404:
          message = 'Recurso não encontrado.'
          break
        default:
          message = 'Não há uma mensagem definida para este erro.'
          break
      }
    }
    if (!statusCode) statusCode = 500
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    })
  } else {
    console.log(err)

    const log_message = Logger.get_message_from_error(err)
    Logger.error(log_message).catch((err) => {
      console.log('Erro do log ignorado')
    })

    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'Algo deu errado... tente novamente em alguns minutos.'
    })
  }
} */

export function HandleError (err: any, req: Request, res: Response) {
  console.log('Handling error')
  if (err instanceof ErrorHandler) {
    let { statusCode, message } = err
    if (message === '') {
      switch (statusCode) {
        case 500:
          message = 'Algo deu errado... tente novamente em alguns minutos.'
          break
        case 400:
          message = 'Há parâmetros obrigatórios mal preenchidos.'
          break
        case 404:
          message = 'Recurso não encontrado.'
          break
        default:
          message = 'Não há uma mensagem definida para este erro.'
          break
      }
    }
    if (!statusCode) statusCode = 500
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    })
  } else {
    console.log(err)

    const log_message = Logger.get_message_from_error(err)
    Logger.error(log_message, req.url).catch(() => {
      console.log('Erro do log ignorado')
    })

    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'Algo deu errado... tente novamente em alguns minutos.'
    })
  }
}

export function HandleErrorMiddleware (err: any, req: Request, res: Response, next: NextFunction) {
  HandleError(err, req, res)
  next()
}

export function NotFoundRoute (req: Request, res: Response) {
  throw new ErrorHandler(404, `${req.url} não existente.`)
}
