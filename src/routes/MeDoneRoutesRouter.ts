import { Router } from 'express'
import DoneRoutesController from '../controllers/DoneRoutesController'

const MeDoneRoutesRouter = Router()

MeDoneRoutesRouter.route('/')
  .get(DoneRoutesController.meList)

MeDoneRoutesRouter.route('/:route_id')
  .post(DoneRoutesController.meStore)

export default MeDoneRoutesRouter
