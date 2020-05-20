import { Router } from 'express'
import AuthenticationsController from '../controllers/AuthenticationsController'

const AuthenticationsRouter = Router()

AuthenticationsRouter.post('/login', AuthenticationsController.login)
AuthenticationsRouter.post('/register', AuthenticationsController.register)
AuthenticationsRouter.post('/generate_reset_password', AuthenticationsController.generate_reset_password)
AuthenticationsRouter.post('/forgot_password', AuthenticationsController.forgot_password)

export default AuthenticationsRouter
