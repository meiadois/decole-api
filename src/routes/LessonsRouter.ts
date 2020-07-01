import { Router } from 'express'
import LessonsController from '@controllers/LessonsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const LessonsRouter = Router()

LessonsRouter.route('/')
  .get(WrapErrorMiddleware(LessonsController.list))
  .post(WrapErrorMiddleware(LessonsController.store))

LessonsRouter.route('/:id')
  .get(WrapErrorMiddleware(LessonsController.index))
  .put(WrapErrorMiddleware(LessonsController.update))
  .delete(WrapErrorMiddleware(LessonsController.delete))

export default LessonsRouter
