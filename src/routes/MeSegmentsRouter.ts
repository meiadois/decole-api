import { Router } from 'express'
import SegmentsController from '@controllers/SegmentsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const SegmentsRouter = Router()

SegmentsRouter.get('/_/has-companies', WrapErrorMiddleware(SegmentsController.meListHasCompanies))

export default SegmentsRouter
