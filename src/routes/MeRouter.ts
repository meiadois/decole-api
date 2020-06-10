import { Router } from 'express'
import MeUsersRouter from './MeUsersRouter'
import MeCompaniesRouter from './MeCompaniesRouter'
import MeDoneRoutesRouter from './MeDoneRoutesRouter'
import MeDoneLessonsRouter from './MeDoneLessonsRouter'
import MeAccountsRouter from './MeAccountsRouter'
import MeRoutesRouter from './MeRoutesRouter'
import MePaymentsRouter from './MePaymentsRouter'
import MeLikesRouter from './MeLikesRouter'
import MeSegmentsRouter from './MeSegmentsRouter'
import MeMetricsRouter from './MeMetricsRouter'

const MeRouter = Router()

MeRouter.use(MeUsersRouter)
MeRouter.use('/companies', MeCompaniesRouter)
MeRouter.use('/done_routes', MeDoneRoutesRouter)
MeRouter.use('/done_lessons', MeDoneLessonsRouter)
MeRouter.use('/accounts', MeAccountsRouter)
MeRouter.use('/routes', MeRoutesRouter)
MeRouter.use('/payments', MePaymentsRouter)
MeRouter.use('/likes', MeLikesRouter)
MeRouter.use('/segments', MeSegmentsRouter)
MeRouter.use('/metrics', MeMetricsRouter)

export default MeRouter
