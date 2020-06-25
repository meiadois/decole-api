import { Request, Response, NextFunction } from 'express'
import { Route } from '../models/Route'
import { DoneLesson } from '../models/DoneLesson'
import { Channel } from '../models/Channel'
import { DoneRoute } from '../models/DoneRoute'
import { RouteRequirement } from '../models/RouteRequirement'
import { Lesson } from '../models/Lesson'

import { ErrorHandler } from '../helpers/ErrorHandler'
import { User } from 'discord.js'
import { Account } from '../models/Account'
import LessonsUtils from '../utils/LessonsUtils'

export interface LessonsWithLock {
  id?: number | null;
  title: string;
  description: string;
  order: number;
  route_id: number;
  done: boolean;
  route?: Route;
  locked: boolean;
}
class RoutesController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _routes = await Route.findAll({
        include: [
          {
            association: 'lessons'
          },
          {
            association: Route.associations.users
          },
          {
            association: Route.associations.route_requirements
          }
        ]
      })

      return res.json(_routes)
    } catch (err) {
      return res.json(err)
      next(err)
    }
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new ErrorHandler(404, '')
      }
      let _route = null
      try {
        _route = await Route.findByPk(id, {
          include: [
            {
              association: 'lessons'
            },
            {
              association: Route.associations.users
            },
            {
              association: Route.associations.route_requirements
            }
          ]
        })
      } catch (err) {
        console.log(err)
      }

      if (_route === null) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }
      return res.status(200).json(_route)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const route = req.body as Route

      const nResults = await Route.count({
        where: { description: route.description }
      })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `Já existe uma rota com a descrição [${route.description}].`)
      }
      const _route = await Route.create(route).catch((err) => {
        console.log(err)
        return null
      })
      if (!_route) {
        throw new ErrorHandler(500, '')
      }

      return res.status(201).json(_route)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { title, description } = req.body
      if (!description || !title) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(id)

      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }

      _route.description = description
      _route.title = title

      const _success = await _route.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(_route)
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

      const _route = await Route.findByPk(id)

      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }

      const _success = await _route.destroy().then(() => {
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

  async meListWithProgress (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user_id = res.locals.user.id

      const _routes = await Route.findAll({
        include: [
          Route.associations.route_requirements,
          Route.associations.lessons
        ],
        order: [
          ['id', 'ASC']
        ]
      })
      // return res.json(_routes)
      const infos = []
      for (let y = 0; y < _routes.length; y++) {
        const lessons = _routes[y].lessons as Lesson[]
        const required_routes = _routes[y].route_requirements as RouteRequirement[]

        let n_done_lessons = 0

        for (let i = 0; i < lessons.length; i++) {
          const n = await DoneLesson.count({ where: { user_id, lesson_id: lessons[i].id as number } })

          lessons[i].done = n !== 0 // is true if is done
          if (lessons[i].done === true) n_done_lessons++
          lessons[i].locked = await LessonsUtils.isLocked(lessons[i] as Lesson, user_id)
        }
        let locked = false
        for (let i = 0; i < required_routes.length; i++) {
          const n = await DoneRoute.count({ where: { user_id, route_id: required_routes[i].required_route_id } })
          if (n === 0) {
            locked = true
            break
          }
        }
        const percentage = n_done_lessons === 0 ? 0 : Math.floor((n_done_lessons * 100) / lessons.length)

        infos.push({
          id: _routes[y].id,
          title: _routes[y].title,
          description: _routes[y].description,
          locked,
          progress: {
            done: n_done_lessons,
            total: lessons.length,
            remain: lessons.length - n_done_lessons,
            percentage: percentage
          }
        })
      }

      return res.status(200).json(
        infos
      )
    } catch (err) {
      next(err)
    }
  }

  async meIndexWithProgress (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const user_id = res.locals.user.id

      const _route = await Route.findByPk(id, {
        include: [
          Route.associations.route_requirements,
          // Route.associations.lessons,
          {
            association: 'lessons',
            include: [
              {
                association: 'requirements'
              }
            ]
          },
          Route.associations.channels
        ]
      })

      const _channels = []

      for (let i = 0; i < _route.channels.length; i++) {
        const n_accounts = await Account.count({ where: { user_id, channel_id: _route.channels[i].id } })
        _channels.push({
          id: _route.channels[i].id,
          name: _route.channels[i].name,
          category: _route.channels[i].category,
          registered: n_accounts > 0
        })
      }
      if (_route === null) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }
      const lessons = _route.lessons as Lesson[]
      const required_routes = _route?.route_requirements as RouteRequirement[]
      let n_done_lessons = 0

      for (let i = 0; i < lessons.length; i++) {
        const n = await DoneLesson.count({ where: { user_id, lesson_id: lessons[i].id as number } })
        lessons[i].done = n !== 0 // is true if is done
        if (n !== 0) n_done_lessons++
        lessons[i].locked = await LessonsUtils.isLocked(lessons[i], user_id)
      }
      let locked = false
      for (let i = 0; i < required_routes.length; i++) {
        const n = await DoneRoute.count({ where: { user_id, route_id: required_routes[i].required_route_id } })

        if (n === 0) {
          locked = true
          break
        }
      }

      return res.status(200).json({
        id: _route.id,
        title: _route.title,
        description: _route.description,
        lessons: lessons,
        _channels,
        locked,
        progress: {
          done: n_done_lessons,
          total: lessons.length,
          remain: lessons.length - n_done_lessons,
          percentage: Math.floor((((n_done_lessons) / lessons.length) * 100))
        }
      })
    } catch (err) {
      next(err)
    }
  }

  async storeLesson (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { lesson_ids } = req.body
      if (!id || !lesson_ids) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(id, {
        include: [
          Route.associations.lessons
        ]
      })
      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }

      for (const i in lesson_ids) {
        const _lesson = await Lesson.findByPk(lesson_ids[i])
        if (!_lesson) {
          throw new ErrorHandler(404, `Lição ${lesson_ids[i]} não encontrada.`)
        }
        const _success = await _route.addLesson(_lesson).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _route.reload())
    } catch (err) {
      next(err)
    }
  }

  async updateLesson (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { lesson_ids } = req.body
      if (!id || !lesson_ids) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(id, {
        include: [
          Route.associations.lessons
        ]
      })
      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }
      const _associated_lessons = _route.lessons
      if (_associated_lessons !== undefined) {
        ;(await _associated_lessons).forEach(async (lesson) => {
          await _route.removeLesson(lesson).catch((err) => {
            console.log(err)
          })
        })
      }

      for (const i in lesson_ids) {
        const _lesson = await Lesson.findByPk(lesson_ids[i])
        if (!_lesson) {
          throw new ErrorHandler(404, `Lição ${lesson_ids[i]} não encontrada.`)
        }
        const _success = await _route.addLesson(_lesson).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })
        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _route.reload())
    } catch (err) {
      next(err)
    }
  }

  async deleteLesson (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { lesson_ids } = req.body
      if (!id || !lesson_ids) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(id, {
        include: [
          Route.associations.lessons
        ]
      })

      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }

      for (const i in lesson_ids) {
        const _lesson = await Lesson.findByPk(lesson_ids[i])
        if (!_lesson) {
          throw new ErrorHandler(404, `Lição ${lesson_ids[i]} não encontrada.`)
        }
        const _success = await _route.removeLesson(_lesson).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }

  async storeChannel (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { channel_ids } = req.body
      if (!id || !channel_ids) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(id, {
        include: [
          Route.associations.channels
        ]
      })
      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }

      for (const i in channel_ids) {
        const _channel = await Channel.findByPk(channel_ids[i])
        if (!_channel) {
          throw new ErrorHandler(404, `Lição ${channel_ids[i]} não encontrada.`)
        }

        const _success = await _route.addChannel(_channel).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _route.reload())
    } catch (err) {
      next(err)
    }
  }

  async updateChannel (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { channel_ids } = req.body
      if (!id || !channel_ids) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(id, {
        include: [
          Route.associations.lessons,
          Route.associations.channels
        ]
      })
      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }

      const _associated_channels = _route.channels
      if (_associated_channels !== undefined) {
        ;(await _associated_channels).forEach(async (channel) => {
          await _route.removeChannel(channel).catch((err) => {
            console.log(err)
          })
        })
      }

      for (const i in channel_ids) {
        const _channel = await Channel.findByPk(channel_ids[i])
        if (!_channel) {
          throw new ErrorHandler(404, `Lição ${channel_ids[i]} não encontrada.`)
        }

        const _success = await _route.addChannel(_channel).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(201).json(await _route.reload())
    } catch (err) {
      next(err)
    }
  }

  async deleteChannel (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { channel_ids } = req.body
      if (!id || !channel_ids) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(id, {
        include: [
          Route.associations.lessons
        ]
      })

      if (!_route) {
        throw new ErrorHandler(404, `Rota ${id} não encontrada.`)
      }

      for (const i in channel_ids) {
        const _channel = await Channel.findByPk(channel_ids[i])
        if (!_channel) {
          throw new ErrorHandler(404, `Lição ${channel_ids[i]} não encontrada.`)
        }

        const _success = await _route.removeChannel(_channel).then(() => {
          return true
        }).catch((err) => {
          console.log(err)
          return false
        })

        if (!_success) {
          throw new ErrorHandler(500, '')
        }
      }

      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}
export default new RoutesController()
