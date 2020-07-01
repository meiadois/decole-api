import { Router } from 'express'
import LessonsController from '@controllers/LessonsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const MeLessonsRouter = Router()

MeLessonsRouter.route('/')
  .get(WrapErrorMiddleware(LessonsController.meListWithLocked))

// MeLessonsRouter.route('/:id')
//   .get(LessonsController.meIndexWithProgress)

export default MeLessonsRouter
