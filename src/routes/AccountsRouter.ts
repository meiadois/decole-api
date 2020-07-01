import { Router } from 'express'
import AccountsController from '@controllers/AccountsController'
import { AccountStoreDTO } from '@validators/Accounts/AccountStoreDTO'
import ValidationMiddleware from '@helpers/ValidationMiddleware'
import { AccountUpdateDTO } from '@validators/Accounts/AccountUpdateDTO'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const AccountsRouter = Router()

AccountsRouter.route('/')
  .get(WrapErrorMiddleware(AccountsController.list))
  .post(ValidationMiddleware(AccountStoreDTO), WrapErrorMiddleware(AccountsController.store))

AccountsRouter.route('/:id')
  .get(WrapErrorMiddleware(AccountsController.index))
  .put(ValidationMiddleware(AccountUpdateDTO), WrapErrorMiddleware(AccountsController.update))
  .delete(WrapErrorMiddleware(AccountsController.delete))

export default AccountsRouter
