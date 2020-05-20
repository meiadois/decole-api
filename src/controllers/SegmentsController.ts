import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../helpers/ErrorHandler'
import { Segment } from '../models/Segment'

class SegmentsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _segments = await Segment.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }).then((result) => result)
        .catch((err) => {
          console.log(err)
          return []
        })
      return res.json(_segments)
    } catch (err) {
      next(err)
    }
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
      }).catch((err: any) => {
        console.log(err)
      })

      if (_segment === null) {
        throw new ErrorHandler(404, `Segmento ${id} não encontrada.`)
      }

      return res.json(_segment)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
      const _segment = await Segment.create({
        name
      }).catch((err: any) => {
        console.log(err)
        return null
      })
      if (!_segment) {
        throw new ErrorHandler(500, '')
      }
      return res.status(201).json(_segment)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
    } catch (err) {
      next(err)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
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
    } catch (err) {
      next(err)
    }
  }
}
export default new SegmentsController()
