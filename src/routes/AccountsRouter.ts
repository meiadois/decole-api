import { Router } from 'express'
import AccountsController from '@controllers/AccountsController'
import { AccountStoreDTO } from '@validators/Accounts/AccountStoreDTO'
import ValidationMiddleware from 'src/utils/middlewares/ValidationMiddleware'
import { AccountUpdateDTO } from '@validators/Accounts/AccountUpdateDTO'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const AccountsRouter = Router()

AccountsRouter.route('/')
  .get(WrapErrorMiddleware(AccountsController.list))
  .post(ValidationMiddleware(AccountStoreDTO), WrapErrorMiddleware(AccountsController.store))

AccountsRouter.route('/:id')
  .get(WrapErrorMiddleware(AccountsController.index))
  .put(ValidationMiddleware(AccountUpdateDTO), WrapErrorMiddleware(AccountsController.update))
  .delete(WrapErrorMiddleware(AccountsController.delete))

export default AccountsRouter
