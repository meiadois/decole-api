import { Router } from 'express'
import AccountsController from '../controllers/AccountsController'

const AccountsRouter = Router()

AccountsRouter.route('/')
  .get(AccountsController.list)
  .post(AccountsController.store)

AccountsRouter.route('/:id')
  .get(AccountsController.index)
  .put(AccountsController.update)
  .delete(AccountsController.delete)

export default AccountsRouter
