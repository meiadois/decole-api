import { Router } from 'express'
import AccountsController from '../controllers/AccountsController'
import { AccountMeStoreDTO } from '../validators/Accounts/AccountMeStoreDTO'
import ValidationMiddleware from '../helpers/ValidationMiddleware'

const MeAccountsRouter = Router()

MeAccountsRouter.route('/')
  .get(AccountsController.meList)
  .post(ValidationMiddleware(AccountMeStoreDTO), AccountsController.meStore)

MeAccountsRouter.route('/:channel_name')
  .get(AccountsController.meIndex)
  .put(AccountsController.meUpdate)
  .delete(AccountsController.meDelete)

export default MeAccountsRouter
