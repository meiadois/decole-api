import { Request, Response, NextFunction } from 'express'
import { LessonRequirement } from '@models/LessonRequirement'
import { Step } from '@models/Step'
import { Lesson } from '@models/Lesson'

import { ErrorHandler } from '@helpers/ErrorHandler'

class LessonRequirementsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _requirements = await LessonRequirement.findAll({
        include: [
          {
            association: 'required_lesson'
          },
          {
            association: 'required_step'
          }
        ]
      })
      res.json(_requirements)
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
      const _requirement = await LessonRequirement.findByPk(id, {
        include: [
          {
            association: 'required_lesson'
          },
          {
            association: 'required_step'
          }
        ]
      })

      if (_requirement === null) {
        throw new ErrorHandler(404, `Requisito ${id} não encontrado.`)
      }
      return res.status(200).json(_requirement)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { lesson_id, required_lesson_id, step_order } = req.body
      if (!lesson_id || !required_lesson_id || !step_order) {
        throw new ErrorHandler(400, '')
      }

      const lesson = await Lesson.findByPk(lesson_id)

      if (!lesson) {
        throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`)
      }

      const required_lesson = await Lesson.findByPk(required_lesson_id)

      if (!required_lesson) {
        throw new ErrorHandler(404, `Lição Requerida ${required_lesson_id} não encontrado.`)
      }

      const step = await Step.findOne({
        where: {
          lesson_id: required_lesson_id,
          order: step_order
        }
      })

      if (!step) {
        throw new ErrorHandler(404, `Etapa ${step_order} da lição ${required_lesson_id} não encontrada.`)
      }

      const nResults = await LessonRequirement.findAll({
        where: {
          lesson_id,
          required_lesson_id,
          required_step_id: step.id as number
        }
      }).then((result) => {
        return result.length
      })
      console.log(nResults)
      if (nResults !== 0) {
        throw new ErrorHandler(400, `A etapa [${step.id}] da lição [${required_lesson_id}] já é requisito para a lição [${lesson_id}].`)
      }

      const _requirement = await LessonRequirement.create({
        lesson_id,
        required_lesson_id,
        required_step_id: step.id
      }).then((result) => result)
        .catch((err) => {
          console.log(err)
          return null
        })

      if (!_requirement) {
        throw new ErrorHandler(500, '')
      }
      /*
      const _success = await lesson.addLessonRequirement(_requirement).then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      } */
      return res.status(201).json(_requirement)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { lesson_id, required_lesson_id, step_order } = req.body
      if (!lesson_id || !required_lesson_id || !step_order) {
        throw new ErrorHandler(400, '')
      }

      const _requirement = await LessonRequirement.findByPk(id)

      if (!_requirement) {
        throw new ErrorHandler(404, `Requisito ${id} não encontrado.`)
      }

      const step = await Step.findOne({ where: { lesson_id: required_lesson_id, order: step_order } })

      if (!step) {
        throw new ErrorHandler(404, `Etapa ${id} não encontrada.`)
      }

      _requirement.lesson_id = lesson_id
      _requirement.required_lesson_id = required_lesson_id
      _requirement.required_step_id = step.id as number

      const _success = await _requirement.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(_requirement)
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

      const _requirement = await LessonRequirement.findByPk(id)

      if (!_requirement) {
        throw new ErrorHandler(404, `Requisito ${id} não encontrado.`)
      }

      const _success = await _requirement.destroy().then(() => {
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
export default new LessonRequirementsController()
