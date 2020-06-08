import { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../helpers/ErrorHandler'
import MetricsLib from '../libs/MetricsLib'

class MetricsController {
  async getMetrics (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { username } = req.params
    try {
      const metricsLib = new MetricsLib(username)
      const metrics = []

      metrics.push(await metricsLib.getInstagramFollowersPerFollowing())
      metrics.push(await metricsLib.geInstagramtMeanOfHashtags())
      metrics.push(await metricsLib.geInstagramtMeanOfMentions())

      return res.json(metrics)
    } catch (err) {
      next(err)
    }
  }
}
export default new MetricsController()
