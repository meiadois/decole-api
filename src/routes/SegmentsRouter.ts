import { Router } from 'express'
import SegmentsController from '@controllers/SegmentsController'
import { SegmentStoreDTO } from '@validators/Segments/SegmentStoreDTO'
import { SegmentUpdateDTO } from '@validators/Segments/SegmentUpdateDTO'
import ValidationMiddleware from 'src/utils/middlewares/ValidationMiddleware'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const SegmentsRouter = Router()

SegmentsRouter.route('/')
  .get(WrapErrorMiddleware(SegmentsController.list))
  .post(ValidationMiddleware(SegmentStoreDTO), WrapErrorMiddleware(SegmentsController.store))

SegmentsRouter.route('/:id')
  .get(WrapErrorMiddleware(SegmentsController.index))
  .put(ValidationMiddleware(SegmentUpdateDTO), WrapErrorMiddleware(SegmentsController.update))
  .delete(WrapErrorMiddleware(SegmentsController.delete))

SegmentsRouter.get('/_/has-companies', WrapErrorMiddleware(SegmentsController.listHasCompanies))

export default SegmentsRouter
