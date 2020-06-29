import { Router } from 'express'
import InstagramController from '../controllers/InstagramController'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const InstagramRouter = Router()

InstagramRouter.get('/user', WrapErrorMiddleware(InstagramController.getUserByNickname))
InstagramRouter.get('/user-profile', WrapErrorMiddleware(InstagramController.getUserProfileByNickname))

export default InstagramRouter
