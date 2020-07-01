import { Router } from 'express'
import UsersController from '@controllers/UsersController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'
import AuthService from '@services/AuthService'

const UsersRouter = Router()

UsersRouter.route('/')
  .get(WrapErrorMiddleware(UsersController.list))

UsersRouter.route('/:id')
  .get(WrapErrorMiddleware(UsersController.index))
  .put(WrapErrorMiddleware(UsersController.update))
  .delete(WrapErrorMiddleware(UsersController.delete))

UsersRouter.route('/:id/companies')
  .post(WrapErrorMiddleware(UsersController.storeCompany))
  .put(WrapErrorMiddleware(UsersController.updateCompany))
  .delete(WrapErrorMiddleware(UsersController.deleteCompany))

export default UsersRouter
