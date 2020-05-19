import { Router } from 'express'
import SegmentsController from './controllers/SegmentsController'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({ message: 'okay' })
})

// Segments
routes.route('/segments/:id')
  .get(SegmentsController.index)
  .put(SegmentsController.update)
  .delete(SegmentsController.delete)

routes.route('/segments')
  .get(SegmentsController.list)
  .post(SegmentsController.store)
export default routes
