import { Request, Response, NextFunction } from 'express'
import { Info } from '@models/Info'
import CustomError from '@utils/CustomError'

export interface KeyValue {
  [name: string]: string;
}

class InfosController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _infos = await Info.findAll()
      // const keyValues: KeyValue = {}

      // await _infos.forEach((info) => {
      //   keyValues[info.name] = info.value
      // })
      const obj = _infos.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {})
      return res.json(obj)
    } catch (err) {
      next(err)
    }
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name } = req.params

      if (!name) {
        throw new CustomError(404, '')
      }
      const _info = await Info.findByPk(name)

      if (_info === null) {
        throw new CustomError(404, `Conta ${name} não encontrada.`)
      }
      return res.status(200).json(_info)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, value } = req.body
      if (!name || !value) {
        throw new CustomError(400, '')
      }

      const [_info] = await Info.findOrCreate({
        where: { name, value }
      })
        .then((result) => result)
        .catch((err) => {
          console.log(err)
          return null
        })
      if (!_info) {
        throw new CustomError(500, '')
      }

      return res.status(201).json(_info)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name } = req.params
      const { value } = req.body
      if (!name) {
        throw new CustomError(400, '')
      }

      const _info = await Info.findByPk(name)

      if (_info === null) {
        throw new CustomError(404, `Conta ${name} não encontrada.`)
      }

      _info.value = value

      const _success = await _info.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(200).json(await _info.reload())
    } catch (err) {
      next(err)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name } = req.params
      if (!name) {
        throw new CustomError(400, '')
      }

      const _info = await Info.findByPk(name)

      if (!_info) {
        throw new CustomError(404, `Conta ${name} não encontrada.`)
      }

      const _success = await _info.destroy().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}
export default new InfosController()
