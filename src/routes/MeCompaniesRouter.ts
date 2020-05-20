import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'

const MeCompaniesRouter = Router()

MeCompaniesRouter.route('/')
  .get(CompaniesController.meList)
  .post(CompaniesController.meStore)
  .put(CompaniesController.meUpdate)
  .delete(CompaniesController.meDelete)

MeCompaniesRouter.route('/:id')
  .get(CompaniesController.meIndex)

export default MeCompaniesRouter
