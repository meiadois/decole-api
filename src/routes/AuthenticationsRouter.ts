import { Router } from 'express'
import AuthenticationsController from '../controllers/AuthenticationsController'
import { UserRegisterDTO } from '../validators/Authentications/UserRegisterDTO'
import validationMiddleware from '../helpers/ValidationMiddleware'
import { UserLoginDTO } from '../validators/Authentications/UserLoginDTO'
import { UserResetPasswordDTO } from '../validators/Authentications/UserResetPasswordDTO'
import { UserForgotPasswordDTO } from '../validators/Authentications/UserForgotPasswordDTO'

const AuthenticationsRouter = Router()

AuthenticationsRouter.post('/login', validationMiddleware(UserLoginDTO), AuthenticationsController.login)
AuthenticationsRouter.post('/register', validationMiddleware(UserRegisterDTO), AuthenticationsController.register)
AuthenticationsRouter.post('/generate_reset_password', validationMiddleware(UserResetPasswordDTO), AuthenticationsController.generate_reset_password)
AuthenticationsRouter.post('/forgot_password', validationMiddleware(UserForgotPasswordDTO), AuthenticationsController.forgot_password)
AuthenticationsRouter.post('/verify_token', AuthenticationsController.verify_token)

export default AuthenticationsRouter
