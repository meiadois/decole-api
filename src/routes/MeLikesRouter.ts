import { Router } from 'express'
import LikesController from '../controllers/LikesController'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const MeLikesRouter = Router()

MeLikesRouter.route('/')
  .get(WrapErrorMiddleware(LikesController.meList))
MeLikesRouter.route('/sent')
  .get(WrapErrorMiddleware(LikesController.meSentList))
MeLikesRouter.route('/received')
  .get(WrapErrorMiddleware(LikesController.meReceivedList))
export default MeLikesRouter
