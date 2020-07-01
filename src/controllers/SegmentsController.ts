import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '@helpers/ErrorHandler'
import { Segment } from '@models/Segment'
import { Company } from '@models/Company'
import { Op } from 'sequelize'
interface JsonObject {
  [key: string]: any;
}
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
      const segment = req.body as Segment

      const nResults = await Segment.count({
        where: { name: segment.name }
      })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe um segmento com o nome [${segment.name}].`)
      }
      const _segment = await Segment.create(segment).catch((err: any) => {
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

  async listHasCompanies (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _companies = await Company.aggregate('segment_id', 'DISTINCT',
        {
          plain: false,
          where: {
            visible: true
          }
        }) as JsonObject[]
      const _segment_ids = _companies.map((obj: JsonObject) => obj.DISTINCT)

      const _segments = await Segment.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          id: {
            [Op.in]: _segment_ids
          }
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

  async meListHasCompanies (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id

      const _user_company = await Company.findOne({

        attributes: {
          exclude: ['name', 'description', 'cnpj', 'cellphone', 'email', 'thumbnail', 'banner']
        },
        include: [
          {
            association: 'users',
            attributes: [],
            where: {
              id: user_id
            }
          }
        ]
      })
      if (!_user_company) {
        throw new ErrorHandler(404, `Empresa do usuário ${user_id} não encontrada.`)
      }

      const _companies = await Company.aggregate('segment_id', 'DISTINCT',
        {
          plain: false,
          where: {
            [Op.not]: [
              {
                id: _user_company.id
              }
            ],
            visible: true
          }
        }) as JsonObject[]
      const _segment_ids = _companies.map((obj: JsonObject) => obj.DISTINCT)
      const _segments = await Segment.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          id: {
            [Op.in]: _segment_ids
          }
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
}
export default new SegmentsController()
