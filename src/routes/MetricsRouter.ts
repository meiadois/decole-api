import { Router } from 'express'
import MetricsController from '@controllers/MetricsController'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const MetricsRouter = Router()

MetricsRouter.route('/:username')
  .get(WrapErrorMiddleware(MetricsController.getMetrics))
export default MetricsRouter
