import { Router } from 'express'
import PaymentsController from '../controllers/PaymentsController'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const MePaymentsRouter = Router()

MePaymentsRouter.route('/')
  .get(WrapErrorMiddleware(PaymentsController.list))
  .post(WrapErrorMiddleware(PaymentsController.store))

MePaymentsRouter.route('/:id')
  .get(WrapErrorMiddleware(PaymentsController.index))
  .put(WrapErrorMiddleware(PaymentsController.update))
  .delete(WrapErrorMiddleware(PaymentsController.delete))

export default MePaymentsRouter
