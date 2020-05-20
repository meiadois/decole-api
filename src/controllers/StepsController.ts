import { Request, Response, NextFunction } from 'express'
import { Step } from '../models/Step'
import { Lesson } from '../models/Lesson'
import { ErrorHandler } from '../helpers/ErrorHandler'

class StepsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _steps = await Step.findAll()
      return res.json(_steps)
    } catch (err) {
      next(err)
    }
  }

  async listByLesson (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { lesson_id } = req.params
      const _lesson = await Lesson.findByPk(lesson_id, {
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
        throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`)
      }
      return res.json(_lesson.steps)
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
      const _step = await Step.findByPk(id)

      if (_step === null) {
        throw new ErrorHandler(404, `Etapa ${id} não encontrada.`)
      }
      return res.status(200).json(_step)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { message, order, lesson_id } = req.body
      if (!message || !order || !lesson_id) {
        throw new ErrorHandler(400, '')
      }
      const nResults = await Step.count({
        where: { message, lesson_id }
      })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe uma etapa com a mensagem [${message}] na lição [${lesson_id}].`)
      }
      const _step = await Step.create({
        message, order, lesson_id
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_step) {
        throw new ErrorHandler(500, '')
      }
      return res.status(201).json(_step)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { message, order } = req.body

      if (!id || !message || !order) {
        throw new ErrorHandler(400, '')
      }

      const _step = await Step.findByPk(id)

      if (!_step) {
        throw new ErrorHandler(404, `Etapa ${id} não encontrada.`)
      }

      _step.message = message
      _step.order = order

      const _success = await _step.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(_step)
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

      const _step = await Step.findByPk(id)

      if (!_step) {
        throw new ErrorHandler(404, `Etapa ${id} não encontrada.`)
      }

      const _success = await _step.destroy().then(() => {
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
export default new StepsController()
