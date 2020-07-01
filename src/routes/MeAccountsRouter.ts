import { Router } from 'express'
import AccountsController from '@controllers/AccountsController'
import { AccountMeStoreDTO } from '@validators/Accounts/AccountMeStoreDTO'
import ValidationMiddleware from 'src/utils/middlewares/ValidationMiddleware'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const MeAccountsRouter = Router()

MeAccountsRouter.route('/')
  .get(WrapErrorMiddleware(AccountsController.meList))
  .post(ValidationMiddleware(AccountMeStoreDTO), WrapErrorMiddleware(AccountsController.meStore))

MeAccountsRouter.route('/:channel_name')
  .get(WrapErrorMiddleware(AccountsController.meIndex))
  .put(WrapErrorMiddleware(AccountsController.meUpdate))
  .delete(WrapErrorMiddleware(AccountsController.meDelete))

export default MeAccountsRouter
