import { Router } from 'express'
import UsersController from '../controllers/UsersController'

const UsersRouter = Router()

UsersRouter.route('/')
  .get(UsersController.list)

UsersRouter.route('/:id')
  .get(UsersController.index)
  .put(UsersController.update)
  .delete(UsersController.delete)

UsersRouter.route('/:id/companies')
  .post(UsersController.storeCompany)
  .put(UsersController.updateCompany)
  .delete(UsersController.deleteCompany)

export default UsersRouter
