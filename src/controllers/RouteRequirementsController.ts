import { Request, Response, NextFunction } from 'express'
import { RouteRequirement } from '@models/RouteRequirement'
import { Route } from '@models/Route'

import CustomError from '@utils/CustomError'

class RouteRequirementsController {
  async list (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const _route_requirements = await RouteRequirement.findAll({
        include: [
          {
            association: 'required_route'
          },
          {
            association: 'route'
          }
        ]
      })
      res.json(_route_requirements)
    } catch (err) {
      next(err)
    }
  }

  async index (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new CustomError(404, '')
      }
      const _route_requirement = await RouteRequirement.findByPk(id, {
        include: [
          {
            association: 'required_route'
          },
          {
            association: 'route'
          }
        ]
      })

      if (_route_requirement === null) {
        throw new CustomError(404, `Requisito ${id} não encontrado.`)
      }
      return res.status(200).json(_route_requirement)
    } catch (err) {
      next(err)
    }
  }

  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { route_id, required_route_id } = req.body
      if (!route_id || !required_route_id) {
        throw new CustomError(400, '')
      }

      const _route = await Route.findByPk(route_id)

      if (!_route) {
        throw new CustomError(404, `Rota ${route_id} não encontrada.`)
      }

      const required_route = await Route.findByPk(required_route_id)

      if (!required_route) {
        throw new CustomError(404, `Rota Requerida ${required_route_id} não encontrado.`)
      }

      const nResults = await RouteRequirement.findAll({
        where: {
          route_id,
          required_route_id
        }
      }).then((result) => {
        return result.length
      })
      console.log(nResults)
      if (nResults !== 0) {
        throw new CustomError(400, `A rota [${required_route_id}] já é requisito da rota [${route_id}].`)
      }

      const _route_requirement = await RouteRequirement.create({
        route_id,
        required_route_id
      }).then((result) => result)
        .catch((err) => {
          console.log(err)
          return null
        })

      if (!_route_requirement) {
        throw new CustomError(500, '')
      }

      return res.status(201).json(_route_requirement)
    } catch (err) {
      next(err)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      const { route_id, required_route_id } = req.body
      if (!route_id || !required_route_id) {
        throw new CustomError(400, '')
      }

      const _route_requirement = await RouteRequirement.findByPk(id)

      if (!_route_requirement) {
        throw new CustomError(404, `Requisito ${id} não encontrado.`)
      }

      _route_requirement.route_id = route_id
      _route_requirement.required_route_id = required_route_id

      const _success = await _route_requirement.save().then(() => {
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })

      if (!_success) {
        throw new CustomError(500, '')
      }
      return res.status(200).json(_route_requirement)
    } catch (err) {
      next(err)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params
      if (!id) {
        throw new CustomError(400, '')
      }

      const _route_requirement = await RouteRequirement.findByPk(id)

      if (!_route_requirement) {
        throw new CustomError(404, `Requisito ${id} não encontrado.`)
      }

      const _success = await _route_requirement.destroy().then(() => {
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
export default new RouteRequirementsController()
