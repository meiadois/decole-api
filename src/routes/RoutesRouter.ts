import { Router } from 'express'
import RoutesController from '../controllers/RoutesController'

const RoutesRouter = Router()

RoutesRouter.route('/')
  .get(RoutesController.list)
  .post(RoutesController.store)

RoutesRouter.route('/:id')
  .get(RoutesController.index)
  .put(RoutesController.update)
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
