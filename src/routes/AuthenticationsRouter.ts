import { Router } from 'express'
import AuthenticationsController from '@controllers/AuthenticationsController'
import { UserRegisterDTO } from '@validators/Authentications/UserRegisterDTO'
import validationMiddleware from 'src/utils/middlewares/ValidationMiddleware'
import { UserLoginDTO } from '@validators/Authentications/UserLoginDTO'
import { UserResetPasswordDTO } from '@validators/Authentications/UserResetPasswordDTO'
import { UserForgotPasswordDTO } from '@validators/Authentications/UserForgotPasswordDTO'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const AuthenticationsRouter = Router()

AuthenticationsRouter.post('/login', validationMiddleware(UserLoginDTO), WrapErrorMiddleware(AuthenticationsController.login))
AuthenticationsRouter.post('/register', validationMiddleware(UserRegisterDTO), WrapErrorMiddleware(AuthenticationsController.register))
AuthenticationsRouter.post('/generate_reset_password', validationMiddleware(UserResetPasswordDTO), WrapErrorMiddleware(AuthenticationsController.generate_reset_password))
AuthenticationsRouter.post('/forgot_password', validationMiddleware(UserForgotPasswordDTO), WrapErrorMiddleware(AuthenticationsController.forgot_password))
AuthenticationsRouter.post('/verify_token', WrapErrorMiddleware(AuthenticationsController.verify_token))

export default AuthenticationsRouter
