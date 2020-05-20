import { Router } from 'express'
import LessonsController from '../controllers/LessonsController'

const LessonsRouter = Router()

LessonsRouter.route('/')
  .get(LessonsController.list)
  .post(LessonsController.store)

LessonsRouter.route('/:id')
  .get(LessonsController.index)
  .put(LessonsController.update)
  .delete(LessonsController.delete)

export default LessonsRouter
