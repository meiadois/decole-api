import { Router } from 'express'
import MercadoLivreController from '../controllers/MercadoLivreController'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const MercadoLivreRouter = Router()

MercadoLivreRouter.get('/user', WrapErrorMiddleware(MercadoLivreController.getUserByNickname))
MercadoLivreRouter.get('/user/reputation', WrapErrorMiddleware(MercadoLivreController.getUserReputationByNickname))

export default MercadoLivreRouter
