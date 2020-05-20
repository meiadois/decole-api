import { Router } from 'express'
import PaymentsController from '../controllers/PaymentsController'

const PaymentsRouter = Router()

PaymentsRouter.route('/')
  .get(PaymentsController.list)
  .post(PaymentsController.store)

PaymentsRouter.route('/:id')
  .get(PaymentsController.index)
  .put(PaymentsController.update)
  .delete(PaymentsController.delete)

export default PaymentsRouter
