import { Router } from 'express'
import StepsController from '../controllers/StepsController'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import { StepStoreDTO } from '../validators/Steps/StepStoreDTO'
import { StepUpdateDTO } from '../validators/Steps/StepUpdateDTO'

const StepsRouter = Router()

StepsRouter.route('/')
  .get(StepsController.list)
  .post(ValidationMiddleware(StepStoreDTO), StepsController.store)

StepsRouter.route('/:id')
  .get(StepsController.index)
  .put(ValidationMiddleware(StepUpdateDTO), StepsController.update)
  .delete(StepsController.delete)

StepsRouter.get('/lessons/:lesson_id', StepsController.listByLesson)

export default StepsRouter
