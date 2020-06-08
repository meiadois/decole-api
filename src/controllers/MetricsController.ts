import { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../helpers/ErrorHandler'
import MetricsLib, { MetricResult, PossibleMetrics } from '../libs/MetricsLib'
interface Metrics {
  followers_per_following?: MetricResult;
  mean_of_hashtags?: MetricResult;
  mean_of_mentions?: MetricResult;
  posts_with_hashtags?: MetricResult;
}
class MetricsController {
  async getMetrics (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { username } = req.params
    try {
      const metricsLib = new MetricsLib(username)

      // metrics.push()
      // metrics.push(await metricsLib.geInstagramtMeanOfHashtags())
      // metrics.push(await metricsLib.geInstagramtMeanOfMentions())
      // metrics.push(await metricsLib.geInstagramPostsWithHashtags())

      return res.json({
        mean_of_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfHashtags),
        followers_per_following: await metricsLib.metricFactory(username, PossibleMetrics.FollowersPerFollowing),
        mean_of_mentions: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfMentions),
        posts_with_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.PostsWithHashtags)
      })
    } catch (err) {
      next(err)
    }
  }
}
export default new MetricsController()
