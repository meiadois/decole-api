import { Router } from 'express'
import LessonRequirementsController from '../controllers/LessonRequirementsController'

const LessonRequirementsRouter = Router()

LessonRequirementsRouter.route('/')
  .get(LessonRequirementsController.list)
  .post(LessonRequirementsController.store)

LessonRequirementsRouter.route('/:id')
  .get(LessonRequirementsController.index)
  .put(LessonRequirementsController.update)
  .delete(LessonRequirementsController.delete)

export default LessonRequirementsRouter
