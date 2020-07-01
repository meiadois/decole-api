import { Router } from 'express'
import LessonRequirementsController from '@controllers/LessonRequirementsController'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const LessonRequirementsRouter = Router()

LessonRequirementsRouter.route('/')
  .get(WrapErrorMiddleware(LessonRequirementsController.list))
  .post(WrapErrorMiddleware(LessonRequirementsController.store))

LessonRequirementsRouter.route('/:id')
  .get(WrapErrorMiddleware(LessonRequirementsController.index))
  .put(WrapErrorMiddleware(LessonRequirementsController.update))
  .delete(WrapErrorMiddleware(LessonRequirementsController.delete))

export default LessonRequirementsRouter
