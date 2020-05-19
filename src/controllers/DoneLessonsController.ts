import { Request, Response } from 'express'
import { ErrorHandler } from '../helpers/error'
import { Lesson } from '../models/Lesson'
import { DoneLesson } from '../models/DoneLesson'

import { User } from '../models/User'

class DoneLessonsController {
  async list (req: Request, res: Response): Promise<Response> {
    const _done_lessons = await DoneLesson.findAll({
      include: [
        {
          association: 'user'
        },
        {
          association: 'lesson'
        }
      ]
    })
    return res.json(_done_lessons)
  }

  async index (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new ErrorHandler(404, '')
    }
    const _done_lesson = await DoneLesson.findByPk(id, {
      include: [
        {
          association: 'user'
        },
        {
          association: 'lesson'
        }
      ]
    })

    if (_done_lesson === null) {
      throw new ErrorHandler(404, `Lição Concluida ${id} não encontrada.`)
    }
    return res.status(200).json(_done_lesson)
  }

  async store (req: Request, res: Response): Promise<Response> {
    const { user_id, lesson_id } = req.body
    if (!user_id || !lesson_id) {
      throw new ErrorHandler(400, '')
    }

    const _lesson = await Lesson.findByPk(lesson_id)

    if (!_lesson) {
      throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`)
    }

    const _user = await User.findByPk(user_id)

    if (!_user) {
      throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
    }

    const _done_lesson = await DoneLesson.create({
      user_id, lesson_id
    }).catch((err) => {
      console.log(err)
      return null
    })
    if (!_done_lesson) {
      throw new ErrorHandler(500, '')
    }

    return res.status(201).json(_done_lesson)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { user_id, lesson_id } = req.body
    if (!user_id || !lesson_id) {
      throw new ErrorHandler(400, '')
    }

    const _done_lesson = await DoneLesson.findByPk(id)

    if (!_done_lesson) {
      throw new ErrorHandler(404, `Lição Concluida ${id} não encontrada.`)
    }

    const _lesson = await Lesson.findByPk(lesson_id)

    if (!_lesson) {
      throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`)
    }

    const _user = await User.findByPk(user_id)

    if (!_user) {
      throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
    }

    _done_lesson.user_id = user_id
    _done_lesson.lesson_id = lesson_id

    const _success = await _done_lesson.save().then(() => {
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(200).json(await _done_lesson.reload())
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    if (!id) {
      throw new ErrorHandler(400, '')
    }

    const _done_lesson = await DoneLesson.findByPk(id)

    if (!_done_lesson) {
      throw new ErrorHandler(404, `Lição Concluida ${id} não encontrada.`)
    }

    const _success = await _done_lesson.destroy().then(() => {
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

    if (!_success) {
      throw new ErrorHandler(500, '')
    }
    return res.status(204).json({})
  }

  async meList (req: Request, res: Response): Promise<Response> {
    const { id } = res.locals.user
    const _done_lesson = await DoneLesson.findAll({
      where: {
        user_id: id
      },
      include: [
        {
          association: 'lesson'
        }
      ]
    })
    return res.json(_done_lesson)
  }

  async meStore (req: Request, res: Response): Promise<Response> {
    const { lesson_id } = req.params
    const user_id = res.locals.user.id

    if (!user_id || !lesson_id) {
      throw new ErrorHandler(400, '')
    }

    const nResults = await DoneLesson.count({ where: { user_id, lesson_id } })

    if (nResults !== 0) {
      throw new ErrorHandler(400, `A lição [${lesson_id}] já foi concluida pelo usuário [${user_id}].`)
    }

    const _lesson = await Lesson.findByPk(lesson_id)

    if (!_lesson) {
      throw new ErrorHandler(404, `Lição ${lesson_id} não encontrada.`)
    }

    const _user = await User.findByPk(user_id)

    if (!_user) {
      throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
    }

    const _done_lesson = await DoneLesson.create({
      user_id, lesson_id
    }).catch((err) => {
      console.log(err)
      return null
    })
    if (!_done_lesson) {
      throw new ErrorHandler(500, '')
    }

    return res.status(201).json(_done_lesson)
  }
}

export default new DoneLessonsController()
