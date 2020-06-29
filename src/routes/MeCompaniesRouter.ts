import { Router } from 'express'
import CompaniesController from '../controllers/CompaniesController'
import ValidationMiddleware from '../helpers/ValidationMiddleware'
import UploadHelper from '../helpers/UploadHelper'
import MeCompanyStoreDTO from '../validators/MeCompanies/MeCompanyStoreDTO'
import MeCompanyUpdateDTO from '../validators/MeCompanies/MeCompanyUpdateDTO'
import WrapErrorMiddleware from '../helpers/WrapErrorMiddleware'

const MeCompaniesRouter = Router()

MeCompaniesRouter.route('/')
  .get(WrapErrorMiddleware(CompaniesController.meList))
  .post(
    UploadHelper.companiesUpload.fields([
      { name: 'banner', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 }
    ]),
    ValidationMiddleware(MeCompanyStoreDTO),
    WrapErrorMiddleware(CompaniesController.meStore))
  .put(
    UploadHelper.companiesUpload.fields([
      { name: 'banner', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 }
    ]),
    ValidationMiddleware(MeCompanyUpdateDTO),
    WrapErrorMiddleware(CompaniesController.meUpdate))
  .delete(WrapErrorMiddleware(CompaniesController.meDelete))

MeCompaniesRouter.route('/:id')
  .get(WrapErrorMiddleware(CompaniesController.meIndex))

MeCompaniesRouter.get('/_/search', WrapErrorMiddleware(CompaniesController.meSearch))

export default MeCompaniesRouter
