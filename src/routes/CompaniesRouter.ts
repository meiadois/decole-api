import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import CompanyStoreDTO from '../validators/Companies/CompanyStoreDTO'
import CompanyUpdateDTO from '../validators/Companies/CompanyUpdateDTO'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'
const CompaniesRouter = Router()

CompaniesRouter.route('/')
  .get(WrapErrorMiddleware(CompaniesController.list))
  .post(ValidationMiddleware(CompanyStoreDTO), WrapErrorMiddleware(CompaniesController.store))

CompaniesRouter.route('/:id')
  .get(WrapErrorMiddleware(CompaniesController.index))
  .put(ValidationMiddleware(CompanyUpdateDTO), WrapErrorMiddleware(CompaniesController.update))
  .delete(WrapErrorMiddleware(CompaniesController.delete))

CompaniesRouter.get('/_/search', WrapErrorMiddleware(CompaniesController.search))
export default CompaniesRouter
