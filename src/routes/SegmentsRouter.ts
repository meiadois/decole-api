import { Router } from 'express'
import SegmentsController from '../controllers/SegmentsController'

const SegmentsRouter = Router()

SegmentsRouter.route('/')
  .get(SegmentsController.list)
  .post(SegmentsController.store)

SegmentsRouter.route('/:id')
  .get(SegmentsController.index)
  .put(SegmentsController.update)
  .delete(SegmentsController.delete)

export default SegmentsRouter
