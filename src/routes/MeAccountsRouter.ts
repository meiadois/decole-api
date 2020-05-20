import { Router } from 'express'
import AccountsController from '../controllers/AccountsController'

const MeAccountsRouter = Router()

MeAccountsRouter.route('/')
  .get(AccountsController.meList)
  .post(AccountsController.meStore)

MeAccountsRouter.route('/:channel_name')
  .get(AccountsController.meIndex)
  .put(AccountsController.meUpdate)
  .delete(AccountsController.meDelete)

export default MeAccountsRouter
