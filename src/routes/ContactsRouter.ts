import { Router } from 'express'
import WrapErrorMiddleware from 'src/utils/middlewares/WrapErrorMiddleware'
import ContactsController from '@controllers/ContactsController'
const ContactsRouter = Router()

ContactsRouter.route('/')
  .post(WrapErrorMiddleware(ContactsController.store))

export default ContactsRouter
