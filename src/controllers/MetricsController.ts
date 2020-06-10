import { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../helpers/ErrorHandler'
import MetricsLib, { MetricResult } from '../libs/MetricsLib'
import { Channel } from '../models/Channel'
import { Account } from '../models/Account'
import { ErrorHandler } from '../helpers/ErrorHandler'
interface Metrics {
  followers_per_following?: MetricResult;
  mean_of_hashtags?: MetricResult;
  mean_of_mentions?: MetricResult;
  posts_with_hashtags?: MetricResult;
}
class MetricsController {
  async getMetrics (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { username } = req.params
    const { channel_name } = req.query

    try {
      const metricsLib = new MetricsLib()
      // return res.json(await metricsLib.instagramFactory(username))
      if (channel_name === 'Instagram') { return res.json(await metricsLib.instagramFactory(username)) };
      throw new ErrorHandler(404, `Não há métricas implementadas para o canal ${channel_name}.`)
      // })
    } catch (err) {
      next(err)
    }
  }

  async getMeMetrics (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { channel_name } = req.params
      const user_id = res.locals.user.id

      const channel_id = await Channel.findOne({
        where: {
          name: channel_name
        }
      }).then((channel) => channel.id)
        .catch((err) => {
          console.log(err)
          return null
        })
      if (channel_id === null) {
        throw new ErrorHandler(404, `Canal ${channel_name} não encontrado.`)
      }

      const username = await Account.findOne({
        where: {
          channel_id,
          user_id
        },
        attributes: {
          include: ['username']
        }
      }).then((account) => account.username)
        .catch((err) => {
          console.log(err)
          return null
        })
      if (username === null) {
        throw new ErrorHandler(404, `Conta do usuário ${user_id} no canal ${channel_name} não encontrado.`)
      }

      const metricsLib = new MetricsLib()

      if (channel_name === 'Instagram') { return res.json(await metricsLib.instagramFactory(username)) };
      throw new ErrorHandler(404, `Não há métricas implementadas para o canal ${channel_name}.`)
      // return res.json({
      //   mean_of_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfHashtags),
      //   mean_of_mentions: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfMentions),
      //   mean_of_comments: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfComments),
      //   mean_of_likes: await metricsLib.metricFactory(username, PossibleMetrics.MeanOfLikes),
      //   posts_with_hashtags: await metricsLib.metricFactory(username, PossibleMetrics.PostsWithHashtags),
      //   followers_per_following: await metricsLib.metricFactory(username, PossibleMetrics.FollowersPerFollowing),
      //   followers: await metricsLib.metricFactory(username, PossibleMetrics.Followers),
      //   following: await metricsLib.metricFactory(username, PossibleMetrics.Following),
      //   publications: await metricsLib.metricFactory(username, PossibleMetrics.Publications)
      // })
    } catch (err) {
      next(err)
    }
  }
}
export default new MetricsController()