import { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../helpers/ErrorHandler'
import MetricsLib, { MetricResult, PossibleMetrics } from '../libs/MetricsLib'
import { Channel } from '../models/Channel'
import { Account } from '../models/Account'
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

      return res.json({
        mean_of_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfHashtags),
        mean_of_mentions: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfMentions),
        mean_of_comments: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfComments),
        mean_of_likes: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfLikes),
        posts_with_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.PostsWithHashtags),
        followers_per_following: await metricsLib.metricFactory(username, PossibleMetrics.FollowersPerFollowing),
        followers: await metricsLib.metricFactory(username, PossibleMetrics.Followers),
        following: await metricsLib.metricFactory(username, PossibleMetrics.Following),
        publications: await metricsLib.metricFactory(username, PossibleMetrics.Publications)
      })
    } catch (err) {
      next(err)
    }
  }

  // async getMeMetrics (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  //   const { username } = req.params
  //   try {
  //     const user_id = res.locals.user.id

  //     const _accounts = await Account.findAll({
  //       where: {
  //         user_id
  //       },
  //       include: [
  //         {
  //           association: 'channel'
  //         }
  //       ]
  //     })

  //     const metricsLib = new MetricsLib(username)

  //     return res.json({
  //       mean_of_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfHashtags),
  //       mean_of_mentions: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfMentions),
  //       mean_of_comments: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfComments),
  //       mean_of_likes: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfLikes),
  //       posts_with_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.PostsWithHashtags),
  //       followers_per_following: await metricsLib.metricFactory(username, PossibleMetrics.FollowersPerFollowing),
  //       followers: await metricsLib.metricFactory(username, PossibleMetrics.Followers),
  //       following: await metricsLib.metricFactory(username, PossibleMetrics.Following),
  //       publications: await metricsLib.metricFactory(username, PossibleMetrics.Publications)
  //     })
  //   } catch (err) {
  //     next(err)
  //   }
  // }
}
export default new MetricsController()
