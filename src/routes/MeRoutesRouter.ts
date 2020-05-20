import { Router } from 'express'
import RoutesController from '../controllers/RoutesController'

const MeRoutesRouter = Router()

MeRoutesRouter.route('/')
  .get(RoutesController.meListWithProgress)

MeRoutesRouter.route('/:id')
  .get(RoutesController.meIndexWithProgress)

export default MeRoutesRouter
