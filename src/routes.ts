import { Router } from 'express'
import StepsController from './controllers/StepsController'
import SegmentsController from './controllers/SegmentsController'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({ message: 'okay' })
})

routes.get('/s', StepsController.list)
routes.get('/si', StepsController.index)

// Segments
routes.route('/v1/segments/:id')
  .get(SegmentsController.index)
  .put(SegmentsController.update)
  .delete(SegmentsController.delete)

routes.route('/v1/segments')
  .get(SegmentsController.list)
  .post(SegmentsController.store)
export default routes
