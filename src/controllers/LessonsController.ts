
import { Request, Response, NextFunction } from 'express'
import { Lesson } from '../models/Lesson'
import { Route } from '../models/Route'

import { ErrorHandler } from '../helpers/ErrorHandler'

class LessonsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _lessons = await Lesson.findAll({
        include: [
          {
            association: 'steps'
          },
          {
            association: 'requirements'
          },
          {
            association: 'route'
          }
        ]
      })
      res.json(_lessons)
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
      const _lesson = await Lesson.findByPk(id, {
        include: [
          {
            association: 'steps'
          },
          {
            association: 'requirements'
          }
        ]
      })

      if (_lesson === null) {
        throw new ErrorHandler(404, `Lição ${id} não encontrada.`)
      }
      return res.status(200).json(_lesson)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { title, description, route_id, order } = req.body

      if (!title || !description || !route_id || !order) {
        throw new ErrorHandler(400, '')
      }
      const nLessons = await Lesson.count({ where: { title } })

      if (nLessons !== 0) {
        throw new ErrorHandler(400, `Já existe uma lição com o título [${title}].`)
      }
      const nRoutes = await Route.count({ where: { id: route_id } })

      if (nRoutes === 0) {
        throw new ErrorHandler(400, `Rota [${route_id}] não encontrada.`)
      }
      const _lesson = await Lesson.create({
        title, description, route_id, order
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_lesson) {
        throw new ErrorHandler(500, '')
      }

      return res.status(201).json(_lesson)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { title, description, route_id, order } = req.body
      if (!description || !title || !route_id || !order) {
        throw new ErrorHandler(400, '')
      }

      const nRoutes = await Route.count({ where: { id: route_id } })

      if (nRoutes === 0) {
        throw new ErrorHandler(400, `Rota [${route_id}] não encontrada.`)
      }

      const _lesson = await Lesson.findByPk(id)

      if (!_lesson) {
        throw new ErrorHandler(404, `Lição ${id} não encontrada.`)
      }

      _lesson.description = description
      _lesson.title = title
      _lesson.route_id = route_id
      _lesson.order = order

      const _success = await _lesson.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(await _lesson.reload())
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

      const _lesson = await Lesson.findByPk(id)

      if (!_lesson) {
        throw new ErrorHandler(404, `Lição ${id} não encontrada.`)
      }

      const _success = await _lesson.destroy().then(() => {
        return true
      }).catch((err) => {
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
export default new LessonsController()
