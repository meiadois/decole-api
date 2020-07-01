import { Router } from 'express'
import DoneLessonsController from '@controllers/DoneLessonsController'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const DoneLessonsRouter = Router()

DoneLessonsRouter.route('/')
  .get(WrapErrorMiddleware(DoneLessonsController.list))
  .post(WrapErrorMiddleware(DoneLessonsController.store))

DoneLessonsRouter.route('/:id')
  .get(WrapErrorMiddleware(DoneLessonsController.index))
  .put(WrapErrorMiddleware(DoneLessonsController.update))
  .delete(WrapErrorMiddleware(DoneLessonsController.delete))

export default DoneLessonsRouter
