import { Request, Response, NextFunction } from 'express'

export function LogsMiddleware (req: Request, res: Response, next: NextFunction) {
  console.log(`[${req.hostname}] : [${req.method}] ${req.path}\n `)
  next()
}
