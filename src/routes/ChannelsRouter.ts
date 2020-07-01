import { Router } from 'express'
import ChannelsController from '@controllers/ChannelsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const ChannelsRouter = Router()

ChannelsRouter.route('/')
  .get(WrapErrorMiddleware(ChannelsController.list))
  .post(WrapErrorMiddleware(ChannelsController.store))

ChannelsRouter.route('/:id')
  .get(WrapErrorMiddleware(ChannelsController.index))
  .put(WrapErrorMiddleware(ChannelsController.update))
  .delete(WrapErrorMiddleware(ChannelsController.delete))

export default ChannelsRouter
