import { Router } from 'express'
import DoneLessonsController from '@controllers/DoneLessonsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const MeDoneLessonsRouter = Router()

MeDoneLessonsRouter.route('/')
  .get(WrapErrorMiddleware(DoneLessonsController.meList))

MeDoneLessonsRouter.route('/:lesson_id')
  .post(WrapErrorMiddleware(DoneLessonsController.meStore))

export default MeDoneLessonsRouter
