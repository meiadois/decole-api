import { Router } from 'express'
import RoutesController from '@controllers/RoutesController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const MeRoutesRouter = Router()

MeRoutesRouter.route('/')
  .get(WrapErrorMiddleware(RoutesController.meListWithProgress))

MeRoutesRouter.route('/:id')
  .get(WrapErrorMiddleware(RoutesController.meIndexWithProgress))

export default MeRoutesRouter
