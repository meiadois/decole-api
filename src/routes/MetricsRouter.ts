import { Router } from 'express'
import MetricsController from '@controllers/MetricsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const MetricsRouter = Router()

MetricsRouter.route('/:username')
  .get(WrapErrorMiddleware(MetricsController.getMetrics))
export default MetricsRouter
