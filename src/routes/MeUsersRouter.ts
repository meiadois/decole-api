import { Router } from 'express'
import UsersController from '@controllers/UsersController'
import WrapErrorMiddleware from '@helpers/WrapErrorMiddleware'

const MeUsersRouter = Router()

MeUsersRouter.route('/')
  .get(WrapErrorMiddleware(UsersController.meIndex))
  .put(WrapErrorMiddleware(UsersController.meUpdate))
  .delete(WrapErrorMiddleware(UsersController.meDelete))

MeUsersRouter.put('/change_password', WrapErrorMiddleware(UsersController.meChangePassword))

MeUsersRouter.post('/introduce', WrapErrorMiddleware(UsersController.meIntroduce))

MeUsersRouter.route('/users/companies')
  .get(WrapErrorMiddleware(UsersController.listMeCompany))
  .post(WrapErrorMiddleware(UsersController.storeMeCompany))
  .put(WrapErrorMiddleware(UsersController.updateMeCompany))
  .delete(WrapErrorMiddleware(UsersController.deleteMeCompany))

export default MeUsersRouter
