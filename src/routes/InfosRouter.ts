import { Router } from 'express'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'
import InfosController from '@controllers/InfosController'
const InfosRouter = Router()

InfosRouter.route('/')
  .get(WrapErrorMiddleware(InfosController.list))
  .post(WrapErrorMiddleware(InfosController.store))

InfosRouter.route('/:name')
  .get(WrapErrorMiddleware(InfosController.index))
  .put(WrapErrorMiddleware(InfosController.update))
  .delete(WrapErrorMiddleware(InfosController.delete))

export default InfosRouter
