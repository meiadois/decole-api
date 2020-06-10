import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import UploadHelper from '../helpers/UploadHelper'
import MeCompanyStoreDTO from '../validators/MeCompanies/MeCompanyStoreDTO'
import MeCompanyUpdateDTO from '../validators/MeCompanies/MeCompanyUpdateDTO'

const MeCompaniesRouter = Router()

MeCompaniesRouter.route('/')
  .get(CompaniesController.meList)
  .post(
    UploadHelper.companiesUpload.fields([
      { name: 'banner', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 }
    ]),
    ValidationMiddleware(MeCompanyStoreDTO),
    CompaniesController.meStore)
  .put(
    UploadHelper.companiesUpload.fields([
      { name: 'banner', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 }
    ]),
    ValidationMiddleware(MeCompanyUpdateDTO),
    CompaniesController.meUpdate)
  .delete(CompaniesController.meDelete)

MeCompaniesRouter.route('/:id')
  .get(CompaniesController.meIndex)

MeCompaniesRouter.get('/_/search', CompaniesController.meSearch)

export default MeCompaniesRouter
