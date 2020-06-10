import { Router } from 'express'
import MetricsController from '../controllers/MetricsController'

const MeMetricsRouter = Router()

MeMetricsRouter.get('/:channel_name', MetricsController.getMeMetrics)

export default MeMetricsRouter
