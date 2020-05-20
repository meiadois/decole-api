import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../helpers/ErrorHandler'
import * as cepPromise from 'cep-promise'

interface CepI{
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}
class CepsController {
  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { cep } = req.params
      const cep_infos = await cepPromise(cep)
        .then(function (result: CepI) {
          return result
        })
        .catch(function (err: any) {
          console.log(err)
          return null
        })
      if (cep_infos == null) {
        throw new ErrorHandler(400, `CEP [${cep}] não encontrado ou mal formado.`)
      }
      return res.json(cep_infos)
    } catch (err) {
      next(err)
    }
  }
}
export default new CepsController()
