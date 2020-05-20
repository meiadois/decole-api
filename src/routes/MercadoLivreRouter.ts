import { Router } from 'express'
import MercadoLivreController from '../controllers/MercadoLivreController'

const MercadoLivreRouter = Router()

MercadoLivreRouter.get('/user', MercadoLivreController.getUserByNickname)
MercadoLivreRouter.get('/user/reputation', MercadoLivreController.getUserReputationByNickname)

export default MercadoLivreRouter
