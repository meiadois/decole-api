import { Router } from 'express'
import PaymentsController from '../controllers/PaymentsController'

const MePaymentsRouter = Router()

MePaymentsRouter.route('/')
  .get(PaymentsController.list)
  .post(PaymentsController.store)

MePaymentsRouter.route('/:id')
  .get(PaymentsController.index)
  .put(PaymentsController.update)
  .delete(PaymentsController.delete)

export default MePaymentsRouter
