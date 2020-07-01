import { Router } from 'express'
import DoneRoutesController from '@controllers/DoneRoutesController'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const MeDoneRoutesRouter = Router()

MeDoneRoutesRouter.route('/')
  .get(WrapErrorMiddleware(DoneRoutesController.meList))

MeDoneRoutesRouter.route('/:route_id')
  .post(WrapErrorMiddleware(DoneRoutesController.meStore))

export default MeDoneRoutesRouter
