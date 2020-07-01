import { Router } from 'express'
import DoneLessonsController from '@controllers/DoneLessonsController'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const MeDoneLessonsRouter = Router()

MeDoneLessonsRouter.route('/')
  .get(WrapErrorMiddleware(DoneLessonsController.meList))

MeDoneLessonsRouter.route('/:lesson_id')
  .post(WrapErrorMiddleware(DoneLessonsController.meStore))

export default MeDoneLessonsRouter
