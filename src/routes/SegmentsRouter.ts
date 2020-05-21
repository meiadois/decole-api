import { Router } from 'express'
import SegmentsController from '../controllers/SegmentsController'
import { SegmentStoreDTO } from '../validators/Segments/SegmentStoreDTO'
import { SegmentUpdateDTO } from '../validators/Segments/SegmentUpdateDTO'
import ValidationMiddleware from '../helpers/ValidationMiddleware'

const SegmentsRouter = Router()

SegmentsRouter.route('/')
  .get(SegmentsController.list)
  .post(ValidationMiddleware(SegmentStoreDTO), SegmentsController.store)

SegmentsRouter.route('/:id')
  .get(SegmentsController.index)
  .put(ValidationMiddleware(SegmentUpdateDTO), SegmentsController.update)
  .delete(SegmentsController.delete)

export default SegmentsRouter
