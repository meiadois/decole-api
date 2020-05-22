import { Router } from 'express'
import LikesController from '../controllers/LikesController'

const MeLikesRouter = Router()

MeLikesRouter.route('/')
  .get(LikesController.meList)
MeLikesRouter.route('/sent')
  .get(LikesController.meSentList)
MeLikesRouter.route('/received')
  .get(LikesController.meReceivedList)
export default MeLikesRouter
