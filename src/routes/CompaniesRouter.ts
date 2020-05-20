import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'

const CompaniesRouter = Router()

CompaniesRouter.route('/')
  .get(CompaniesController.list)
  .post(CompaniesController.store)

CompaniesRouter.route('/:id')
  .get(CompaniesController.index)
  .put(CompaniesController.update)
  .delete(CompaniesController.delete)

CompaniesRouter.get('/_/search')
export default CompaniesRouter
