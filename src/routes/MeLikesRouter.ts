import { Router } from 'express'
import LikesController from '../controllers/LikesController'

const MeLikesRouter = Router()

MeLikesRouter.route('/')
  .get(LikesController.meList)

export default MeLikesRouter
