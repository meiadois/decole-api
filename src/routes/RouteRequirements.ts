import { Router } from 'express'
import RouteRequirementsController from '../controllers/RouteRequirementsController'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const RouteRequirementsRouter = Router()

RouteRequirementsRouter.route('/')
  .get(WrapErrorMiddleware(RouteRequirementsController.list))
  .post(WrapErrorMiddleware(RouteRequirementsController.store))

RouteRequirementsRouter.route('/:id')
  .get(WrapErrorMiddleware(RouteRequirementsController.index))
  .put(WrapErrorMiddleware(RouteRequirementsController.update))
  .delete(WrapErrorMiddleware(RouteRequirementsController.delete))

export default RouteRequirementsRouter
