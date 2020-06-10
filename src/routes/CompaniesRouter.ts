import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import CompanyStoreDTO from '../validators/Companies/CompanyStoreDTO'
import CompanyUpdateDTO from '../validators/Companies/CompanyUpdateDTO'
const CompaniesRouter = Router()

CompaniesRouter.route('/')
  .get(CompaniesController.list)
  .post(ValidationMiddleware(CompanyStoreDTO), CompaniesController.store)

CompaniesRouter.route('/:id')
  .get(CompaniesController.index)
  .put(ValidationMiddleware(CompanyUpdateDTO), CompaniesController.update)
  .delete(CompaniesController.delete)

CompaniesRouter.get('/_/search', CompaniesController.search)
export default CompaniesRouter
