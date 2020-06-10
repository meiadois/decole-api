import { Router } from 'express'
import MetricsController from '../controllers/MetricsController'

const MetricsRouter = Router()

MetricsRouter.route('/:username')
  .get(MetricsController.getMetrics)
export default MetricsRouter
