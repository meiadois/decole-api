import { Router } from 'express'
import CepsController from '@controllers/CepsController'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'

const CepsRouter = Router()

CepsRouter.get('/:cep', WrapErrorMiddleware(CepsController.index))

export default CepsRouter
