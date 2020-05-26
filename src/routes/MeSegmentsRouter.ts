import { Router } from 'express'
import SegmentsController from '../controllers/SegmentsController'

const SegmentsRouter = Router()

SegmentsRouter.get('/_/has-companies', SegmentsController.meListHasCompanies)

export default SegmentsRouter
