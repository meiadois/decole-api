import { Router } from 'express'
import LikesController from '@controllers/LikesController'
import ValidationMiddleware from 'src/utils/middlewares/ValidationMiddleware'
import { LikeStoreDTO } from '@validators/Likes/LikeStoreDTO'
import { LikeUpdateDTO } from '@validators/Likes/LikeUpdateDTO'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const LikesRouter = Router()

LikesRouter.route('/')
  .get(WrapErrorMiddleware(LikesController.list))
  .post(ValidationMiddleware(LikeStoreDTO), WrapErrorMiddleware(LikesController.store))

LikesRouter.route('/:id')
  .get(WrapErrorMiddleware(LikesController.index))
  .put(ValidationMiddleware(LikeUpdateDTO), WrapErrorMiddleware(LikesController.update))
  .delete(WrapErrorMiddleware(LikesController.delete))

export default LikesRouter
