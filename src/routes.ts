import { Router, Request, Response } from 'express'
import AccountsRouter from './routes/AccountsRouter'
import AuthenticationsRouter from './routes/AuthenticationsRouter'
import CepsRouter from './routes/CepsRouter'
import ChannelsRouter from './routes/ChannelsRouter'
import CompaniesRouter from './routes/CompaniesRouter'
import DoneLessonsRouter from './routes/DoneLessonsRouter'
import DoneRoutesRouter from './routes/DoneRoutesRouter'
import InstagramRouter from './routes/InstagramRouter'
import LessonRequirements from './routes/LessonRequirements'
import LessonsRouter from './routes/LessonsRouter'
import LikesRouter from './routes/LikesRouter'
import MercadoLivreRouter from './routes/MercadoLivreRouter'
import PaymentsRouter from './routes/PaymentsRouter'
import RouteRequirements from './routes/RouteRequirements'
import RoutesRouter from './routes/RoutesRouter'
import SegmentsRouter from './routes/SegmentsRouter'
import StepsRouter from './routes/StepsRouter'
import UsersRouter from './routes/UsersRouter'
import MeRouter from './routes/MeRouter'
import AuthService from './services/AuthService'

const routes = Router()

routes.get('/', (req: Request, res: Response): string => {
  const message = 'Okay'
  return message
})

routes.use('/accounts', AccountsRouter)
routes.use(AuthenticationsRouter)
routes.use('/ceps', CepsRouter)
routes.use('/channels', ChannelsRouter)
routes.use('/companies', CompaniesRouter)
routes.use('/done_lessons', DoneLessonsRouter)
routes.use('/done_routes', DoneRoutesRouter)
routes.use('/insta', InstagramRouter)
routes.use('/lesson_requirements', LessonRequirements)
routes.use('/lessons', LessonsRouter)
routes.use('/likes', LikesRouter)
routes.use('/mercado-livre', MercadoLivreRouter)
routes.use('/payments', PaymentsRouter)
routes.use('/route_requirements', RouteRequirements)
routes.use('/routes', RoutesRouter)
routes.use('/segments', SegmentsRouter)
routes.use('/steps', StepsRouter)
routes.use('/users', UsersRouter)
routes.use('/me', AuthService.authorize, MeRouter)

export default routes
