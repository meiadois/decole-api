import { Router } from 'express'
import RoutesController from '../controllers/RoutesController'
import { RouteStoreDTO } from '../validators/Routes/RouteStoreDTO'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import { RouteUpdateDTO } from '../validators/Routes/RouteUpdateDTO'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const RoutesRouter = Router()

RoutesRouter.route('/')
  .get(WrapErrorMiddleware(RoutesController.list))
  .post(ValidationMiddleware(RouteStoreDTO), WrapErrorMiddleware(RoutesController.store))

RoutesRouter.route('/:id')
  .get(WrapErrorMiddleware(RoutesController.index))
  .put(ValidationMiddleware(RouteUpdateDTO), WrapErrorMiddleware(RoutesController.update))
  .delete(WrapErrorMiddleware(RoutesController.delete))

RoutesRouter.route('/:id/lessons')
  .post(WrapErrorMiddleware(RoutesController.storeLesson))
  .put(WrapErrorMiddleware(RoutesController.updateLesson))
  .delete(WrapErrorMiddleware(RoutesController.deleteLesson))

RoutesRouter.route('/:id/channels')
  .post(WrapErrorMiddleware(RoutesController.storeChannel))
  .put(WrapErrorMiddleware(RoutesController.updateChannel))
  .delete(WrapErrorMiddleware(RoutesController.deleteChannel))

export default RoutesRouter
