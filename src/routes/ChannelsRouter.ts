import { Router } from 'express'
import ChannelsController from '../controllers/ChannelsController'

const ChannelsRouter = Router()

ChannelsRouter.route('/')
  .get(ChannelsController.list)
  .post(ChannelsController.store)

ChannelsRouter.route('/:id')
  .get(ChannelsController.index)
  .put(ChannelsController.update)
  .delete(ChannelsController.delete)

export default ChannelsRouter
