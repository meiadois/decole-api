import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'
import CompanyUpdateDTO from '../validators/Companies/CompanyUpdateDTO'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import UploadHelper from '../helpers/UploadHelper'
import MeCompanyStoreDTO from '../validators/MeCompanies/MeCompanyStoreDTO'

const MeCompaniesRouter = Router()

MeCompaniesRouter.route('/')
  .get(CompaniesController.meList)
  .post(
    ValidationMiddleware(MeCompanyStoreDTO),
    UploadHelper.companiesUpload.fields([
      { name: 'banner', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 }
    ]), CompaniesController.meStore)
  .put(ValidationMiddleware(CompanyUpdateDTO), CompaniesController.meUpdate)
  .delete(CompaniesController.meDelete)

MeCompaniesRouter.route('/:id')
  .get(CompaniesController.meIndex)

MeCompaniesRouter.get('/_/search', CompaniesController.meSearch)

export default MeCompaniesRouter
