import { Router } from 'express'
import DoneRoutesController from '@controllers/DoneRoutesController'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const DoneRoutesRouter = Router()

DoneRoutesRouter.route('/')
  .get(WrapErrorMiddleware(DoneRoutesController.list))
  .post(WrapErrorMiddleware(DoneRoutesController.store))

DoneRoutesRouter.route('/:id')
  .get(WrapErrorMiddleware(DoneRoutesController.index))
  .put(WrapErrorMiddleware(DoneRoutesController.update))
  .delete(WrapErrorMiddleware(DoneRoutesController.delete))

export default DoneRoutesRouter
