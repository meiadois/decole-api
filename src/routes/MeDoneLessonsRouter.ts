import { Router } from 'express'
import DoneLessonsController from '../controllers/DoneLessonsController'

const MeDoneLessonsRouter = Router()

MeDoneLessonsRouter.route('/')
  .get(DoneLessonsController.meList)

MeDoneLessonsRouter.route('/:lesson_id')
  .post(DoneLessonsController.meStore)

export default MeDoneLessonsRouter
