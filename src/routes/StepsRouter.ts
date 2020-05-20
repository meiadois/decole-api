import { Router } from 'express'
import StepsController from '../controllers/StepsController'

const StepsRouter = Router()

StepsRouter.route('/')
  .get(StepsController.list)
  .post(StepsController.store)

StepsRouter.route('/:id')
  .get(StepsController.index)
  .put(StepsController.update)
  .delete(StepsController.delete)

StepsRouter.get('/lessons/:lesson_id', StepsController.listByLesson)

export default StepsRouter
