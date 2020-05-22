import { Router } from 'express'
import LikesController from '../controllers/LikesController'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import { LikeStoreDTO } from '../validators/Likes/LikeStoreDTO'
import { LikeUpdateDTO } from '../validators/Likes/LikeUpdateDTO'

const LikesRouter = Router()

LikesRouter.route('/')
  .get(LikesController.list)
  .post(ValidationMiddleware(LikeStoreDTO), LikesController.store)

LikesRouter.route('/:id')
  .get(LikesController.index)
  .put(ValidationMiddleware(LikeUpdateDTO), LikesController.update)
  .delete(LikesController.delete)

export default LikesRouter
