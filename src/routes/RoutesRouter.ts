import { Router } from 'express'
import RoutesController from '../controllers/RoutesController'
import { RouteStoreDTO } from '../validators/Routes/RouteStoreDTO'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import { RouteUpdateDTO } from '../validators/Routes/RouteUpdateDTO'

const RoutesRouter = Router()

RoutesRouter.route('/')
  .get(RoutesController.list)
  .post(ValidationMiddleware(RouteStoreDTO), RoutesController.store)

RoutesRouter.route('/:id')
  .get(RoutesController.index)
  .put(ValidationMiddleware(RouteUpdateDTO), RoutesController.update)
  .delete(RoutesController.delete)

RoutesRouter.route('/:id/lessons')
  .post(RoutesController.storeLesson)
  .put(RoutesController.updateLesson)
  .delete(RoutesController.deleteLesson)

RoutesRouter.route('/:id/channels')
  .post(RoutesController.storeChannel)
  .put(RoutesController.updateChannel)
  .delete(RoutesController.deleteChannel)

export default RoutesRouter
