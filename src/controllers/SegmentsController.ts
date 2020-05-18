import { Request, Response, NextFunction } from 'express'
import db from '../models/index'
import { ErrorHandler } from '../helpers/error'
import { Segment } from '../models/Segment'
const Segment = db.Segment

class StepsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const _segments = await Segment.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    return res.json(_segments)
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Segment> {
    const { id } = req.params

    if (!id) {
      throw new ErrorHandler(404, '')
    }
    const _segment = await Segment.findByPk(id, {
      include: [
        {
          association: 'companies'
        }
      ]
    })

    if (_segment === null) {
      throw new ErrorHandler(404, `Segmento ${id} não encontrada.`)
    }

    return _segment
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name } = req.body
    if (!name) {
      throw new ErrorHandler(400, '')
    }
    const nResults = await Segment.count({
      where: { name }
    })

    if (nResults !== 0) {
      throw new ErrorHandler(400, `Já existe um segmento com o nome [${name}].`)
    }
    const [_segment] = await Segment.findOrCreate({
      where: { name }
    }).catch((err: any) => {
      console.log(err)
      return null
    })
    if (!_segment) {
      throw new ErrorHandler(500, '')
    }
    return res.status(201).json(_segment)
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { id } = req.params
    const { name } = req.body

    if (!id || !name) {
      throw new ErrorHandler(400, '')
    }

    const _segment = await Segment.findByPk(id)

    if (!_segment) {
      throw new ErrorHandler(404, `Segmento ${id} não encontrada.`)
    }

    _segment.name = name

    const _success = await _segment.save().then(() => {
      return true
    }).catch((err: any) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(200).json(_segment)
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new ErrorHandler(400, '')
    }

    const _segment = await Segment.findByPk(id)

    if (!_segment) {
      throw new ErrorHandler(404, `Segmento ${id} não encontrada.`)
    }

    const _success = await _segment.destroy().then(() => {
      return true
    }).catch((err: any) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(204).json({})
  }
}
export default new StepsController()
