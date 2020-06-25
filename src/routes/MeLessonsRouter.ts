import { Router } from 'express'
import LessonsController from '../controllers/LessonsController'

const MeLessonsRouter = Router()

MeLessonsRouter.route('/')
  .get(LessonsController.meListWithLocked)

// MeLessonsRouter.route('/:id')
//   .get(LessonsController.meIndexWithProgress)

export default MeLessonsRouter
