import { Request, Response } from 'express'
import { ErrorHandler } from '../helpers/error'
import * as cepPromise from 'cep-promise'

class CepsController {
  async index (req: Request, res: Response): Promise<Response> {
    const { cep } = req.params
    const cep_infos = await cepPromise(cep)
      .then(function (result) {
        return result
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    if (cep_infos == null) {
      throw new ErrorHandler(400, `CEP [${cep}] não encontrado ou mal formado.`)
    }
    return res.json(cep_infos)
  }
}
export default new CepsController()
