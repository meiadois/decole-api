import { Router } from 'express'
import MetricsController from '@controllers/MetricsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const MeMetricsRouter = Router()

MeMetricsRouter.get('/:channel_name', WrapErrorMiddleware(MetricsController.getMeMetrics))

export default MeMetricsRouter
