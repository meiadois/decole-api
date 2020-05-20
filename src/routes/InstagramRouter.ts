import { Router } from 'express'
import InstagramController from '../controllers/InstagramController'

const InstagramRouter = Router()

InstagramRouter.get('/user', InstagramController.getUserByNickname)
InstagramRouter.get('/user-profile', InstagramController.getUserProfileByNickname)

export default InstagramRouter
