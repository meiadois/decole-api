import { Router } from 'express'
import CepsController from '../controllers/CepsController'

const CepsRouter = Router()

CepsRouter.get('/:cep', CepsController.index)

export default CepsRouter
