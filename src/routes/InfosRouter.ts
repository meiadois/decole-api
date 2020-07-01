import { Router } from 'express'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'
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
