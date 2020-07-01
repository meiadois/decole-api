import { Router } from 'express'
import StepsController from '@controllers/StepsController'
import ValidationMiddleware from 'src/utils/middlewares/ValidationMiddleware'
import { StepStoreDTO } from '@validators/Steps/StepStoreDTO'
import { StepUpdateDTO } from '@validators/Steps/StepUpdateDTO'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const StepsRouter = Router()

StepsRouter.route('/')
  .get(WrapErrorMiddleware(StepsController.list))
  .post(ValidationMiddleware(StepStoreDTO), WrapErrorMiddleware(StepsController.store))

StepsRouter.route('/:id')
  .get(WrapErrorMiddleware(StepsController.index))
  .put(ValidationMiddleware(StepUpdateDTO), WrapErrorMiddleware(StepsController.update))
  .delete(WrapErrorMiddleware(StepsController.delete))

StepsRouter.get('/lessons/:lesson_id', WrapErrorMiddleware(StepsController.listByLesson))

export default StepsRouter
