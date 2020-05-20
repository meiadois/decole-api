import { Router } from 'express'
import DoneRoutesController from '../controllers/DoneRoutesController'

const DoneRoutesRouter = Router()

DoneRoutesRouter.route('/')
  .get(DoneRoutesController.list)
  .post(DoneRoutesController.store)

DoneRoutesRouter.route('/:id')
  .get(DoneRoutesController.index)
  .put(DoneRoutesController.update)
  .delete(DoneRoutesController.delete)

export default DoneRoutesRouter
