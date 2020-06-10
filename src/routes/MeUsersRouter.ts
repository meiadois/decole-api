import { Router } from 'express'
import UsersController from '../controllers/UsersController'

const MeUsersRouter = Router()

MeUsersRouter.route('/')
  .get(UsersController.meIndex)
  .put(UsersController.meUpdate)
  .delete(UsersController.meDelete)

MeUsersRouter.put('/change_password', UsersController.meChangePassword)

MeUsersRouter.post('/introduce', UsersController.meIntroduce)

MeUsersRouter.route('/users/companies')
  .get(UsersController.listMeCompany)
  .post(UsersController.storeMeCompany)
  .put(UsersController.updateMeCompany)
  .delete(UsersController.deleteMeCompany)

export default MeUsersRouter
