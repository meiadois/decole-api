import { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from '../helpers/ErrorHandler'
import { DoneRoute } from '../models/DoneRoute'
import { Route } from '../models/Route'

import { DoneLesson } from '../models/DoneLesson'

import { User } from '../models/User'

class DoneRoutesController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _done_route = await DoneRoute.findAll({
        include: [
          {
            association: 'user'
          },
          {
            association: 'route'
          }
        ]
      })
      return res.json(_done_route)
    } catch (err) {
      next(err)
    }
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {

    } catch (err) {
      next(err)
    }
    const { id } = req.params

    if (!id) {
      throw new ErrorHandler(404, '')
    }
    const _done_route = await DoneRoute.findByPk(id, {
      include: [
        {
          association: 'user'
        },
        {
          association: 'route'
        }
      ]
    })

    if (_done_route === null) {
      throw new ErrorHandler(404, `Rota Concluida ${id} não encontrada.`)
    }
    return res.status(200).json(_done_route)
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { user_id, route_id } = req.body
      if (!user_id || !route_id) {
        throw new ErrorHandler(400, '')
      }

      const _route = await Route.findByPk(route_id)

      if (!_route) {
        throw new ErrorHandler(404, `Rota ${route_id} não encontrada.`)
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
      }

      const _done_route = await DoneRoute.create({
        user_id, route_id
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_done_route) {
        throw new ErrorHandler(500, '')
      }

      return res.status(201).json(_done_route)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { user_id, route_id } = req.body
      if (!user_id || !route_id) {
        throw new ErrorHandler(400, '')
      }

      const _done_route = await DoneRoute.findByPk(id)

      if (!_done_route) {
        throw new ErrorHandler(404, `Rota Concluida ${id} não encontrada.`)
      }

      const _route = await Route.findByPk(route_id)

      if (!_route) {
        throw new ErrorHandler(404, `Rota ${route_id} não encontrada.`)
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
      }

      _done_route.user_id = user_id
      _done_route.route_id = route_id

      const _success = await _done_route.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new ErrorHandler(500, '')
      }
      return res.status(200).json(await _done_route.reload())
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

      const _done_route = await DoneRoute.findByPk(id)

      if (!_done_route) {
        throw new ErrorHandler(404, `Rota Concluida ${id} não encontrada.`)
      }

      const _success = await _done_route.destroy().then(() => {
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

  async meList (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = res.locals.user
      const _done_route = await DoneRoute.findAll({
        where: {
          user_id: id
        },
        include: [
          {
            association: 'route'
          }
        ],
        attributes: {
          exclude: ['user_id']
        }

      })

      // _done_route.user.password = null;
      return res.json(_done_route)
    } catch (err) {
      next(err)
    }
  }

  async meStore (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { route_id } = req.params
      const user_id = res.locals.user.id
      if (!user_id || !route_id) {
        throw new ErrorHandler(400, '')
      }
      const nResults = await DoneRoute.count({ where: { user_id, route_id } })

      if (nResults !== 0) {
        throw new ErrorHandler(400, `A rota [${route_id}] já foi concluida pelo usuário [${user_id}].`)
      }

      const _route = await Route.findByPk(route_id, {
        include: [
          {
            association: 'lessons'
          }
        ]
      })

      if (!_route) {
        throw new ErrorHandler(404, `Rota ${route_id} não encontrada.`)
      }

      const _user = await User.findByPk(user_id)

      if (!_user) {
        throw new ErrorHandler(404, `Usuário ${user_id} não encontrado.`)
      }

      const _done_route = await DoneRoute.create({
        user_id, route_id
      }).catch((err) => {
        console.log(err)
        return null
      })
      if (!_done_route) {
        throw new ErrorHandler(500, '')
      }
      delete _done_route.user_id
      /*
              var _done_route = await DoneRoute.findByPk(_done_route.id, {
                  attributes: {
                      exclude: ['user_id']
                  }
              }); */
      if (_route.lessons !== undefined) {
        for (let i = 0; i < _route.lessons.length; i++) {
          await DoneLesson.create({
            user_id, lesson_id: _route.lessons[i].id
          })
        }
      }

      return res.status(201).json(_done_route)
    } catch (err) {
      next(err)
    }
  }
}
export default new DoneRoutesController()
