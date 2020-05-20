import { Router } from 'express'
import LikesController from '../controllers/LikesController'

const LikesRouter = Router()

LikesRouter.route('/')
  .get(LikesController.list)
  .post(LikesController.store)

LikesRouter.route('/:id')
  .get(LikesController.index)
  .put(LikesController.update)
  .delete(LikesController.delete)

export default LikesRouter
