import { Router } from 'express'
import DoneLessonsController from '../controllers/DoneLessonsController'

const DoneLessonsRouter = Router()

DoneLessonsRouter.route('/')
  .get(DoneLessonsController.list)
  .post(DoneLessonsController.store)

DoneLessonsRouter.route('/:id')
  .get(DoneLessonsController.index)
  .put(DoneLessonsController.update)
  .delete(DoneLessonsController.delete)

export default DoneLessonsRouter
