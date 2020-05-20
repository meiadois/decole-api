import { Router } from 'express'
import RouteRequirementsController from '../controllers/RouteRequirementsController'

const RouteRequirementsRouter = Router()

RouteRequirementsRouter.route('/')
  .get(RouteRequirementsController.list)
  .post(RouteRequirementsController.store)

RouteRequirementsRouter.route('/:id')
  .get(RouteRequirementsController.index)
  .put(RouteRequirementsController.update)
  .delete(RouteRequirementsController.delete)

export default RouteRequirementsRouter
