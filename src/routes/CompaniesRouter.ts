import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'
import validationMiddleware from '../helpers/ValidationMiddleware'
import CompanyStoreDTO from '../validators/Companies/CompanyStoreDTO'
import CompanyUpdateDTO from '../validators/Companies/CompanyUpdateDTO'

const CompaniesRouter = Router()

CompaniesRouter.route('/')
  .get(CompaniesController.list)
  .post(validationMiddleware(CompanyStoreDTO), CompaniesController.store)

CompaniesRouter.route('/:id')
  .get(CompaniesController.index)
  .put(validationMiddleware(CompanyUpdateDTO), CompaniesController.update)
  .delete(CompaniesController.delete)

CompaniesRouter.get('/_/search')
export default CompaniesRouter
