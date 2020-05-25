import { Router } from 'express'
import AccountsController from '../controllers/AccountsController'
import { AccountStoreDTO } from '../validators/Accounts/AccountStoreDTO'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import { AccountUpdateDTO } from '../validators/Accounts/AccountUpdateDTO'

const AccountsRouter = Router()

AccountsRouter.route('/')
  .get(AccountsController.list)
  .post(ValidationMiddleware(AccountStoreDTO), AccountsController.store)

AccountsRouter.route('/:id')
  .get(AccountsController.index)
  .put(ValidationMiddleware(AccountUpdateDTO), AccountsController.update)
  .delete(AccountsController.delete)

export default AccountsRouter
