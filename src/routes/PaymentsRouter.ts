import { Router } from 'express'
import PaymentsController from '../controllers/PaymentsController'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const PaymentsRouter = Router()

PaymentsRouter.route('/')
  .get(WrapErrorMiddleware(PaymentsController.list))
  .post(WrapErrorMiddleware(PaymentsController.store))

PaymentsRouter.route('/:id')
  .get(WrapErrorMiddleware(PaymentsController.index))
  .put(WrapErrorMiddleware(PaymentsController.update))
  .delete(WrapErrorMiddleware(PaymentsController.delete))

export default PaymentsRouter
