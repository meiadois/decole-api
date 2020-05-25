import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'
import CompanyStoreDTO from '../validators/Companies/CompanyStoreDTO'
import CompanyUpdateDTO from '../validators/Companies/CompanyUpdateDTO'
import ValidationMiddleware from '../helpers/ValidationMiddleware'

const MeCompaniesRouter = Router()

MeCompaniesRouter.route('/')
  .get(CompaniesController.meList)
  .post(ValidationMiddleware(CompanyStoreDTO), CompaniesController.meStore)
  .put(ValidationMiddleware(CompanyUpdateDTO), CompaniesController.meUpdate)
  .delete(CompaniesController.meDelete)

MeCompaniesRouter.route('/:id')
  .get(CompaniesController.meIndex)

MeCompaniesRouter.get('/_/search', CompaniesController.meSearch)

export default MeCompaniesRouter
