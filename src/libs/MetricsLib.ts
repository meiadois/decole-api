import InstaLib, { UserInstagramProfile, InstalibError } from './InstaLib'
import { ErrorHandler } from '../helpers/ErrorHandler'
export interface CountHashtagsAndMentions{
    hashtags: number;
    mentions: number;
}
export interface MeanOfHashtagsAndMentions{
    hashtags: number;
    mentions: number;
}

export interface FollowersPerFollowing{
    followers_per_following: number;
}
export interface MetricResult {
  name: string;
  success: boolean;
  error_message: string;
  value: number | string;
}
function occurrences (string: string, subString: string, allowOverlapping: boolean): number {
  string += ''
  subString += ''
  if (subString.length <= 0) return (string.length + 1)

  let n = 0
  let pos = 0
  const step = allowOverlapping ? 1 : subString.length

  while (true) {
    pos = string.indexOf(subString, pos)
    if (pos >= 0) {
      ++n
      pos += step
    } else break
  }
  return n
}

export default class MetricsLib {
    private username: string
    private InstagramProfile: UserInstagramProfile = null
    constructor (username: string) {
      this.username = username
    }

    async getInstagramProfile (): Promise<void> {
      this.InstagramProfile = await InstaLib.getUserProfileByNickname(this.username)
    }

    async getInstagramFollowersPerFollowing (): Promise<MetricResult> {
      const metricName = 'followers_per_following'
      try {
        if (this.InstagramProfile === null) {
          await this.getInstagramProfile()
        }
        const following = this.InstagramProfile.graphql.user.edge_follow.count
        const followers = this.InstagramProfile.graphql.user.edge_followed_by.count
        return {
          name: metricName,
          success: true,
          error_message: '',
          value: followers / following
        }
      } catch (err) {
        if (err instanceof InstalibError) {
          return {
            name: metricName,
            success: false,
            error_message: err.message,
            value: 0
          }
        }
        console.log(err)
        throw err
      }
    }

    async geInstagramtMeanOfHashtags (): Promise<MetricResult> {
      const metricName = 'mean_of_hashtags'
      try {
        if (this.InstagramProfile === null) {
          await this.getInstagramProfile()
        }
        const posts = this.InstagramProfile.graphql.user.edge_owner_to_timeline_media.edges
        const nPosts = posts.length
        let texts = ''
        for (const post of posts) {
          for (const text of post.node.edge_media_to_caption.edges) {
            texts += text.node.text
          }
        }
        const nHashtags = occurrences(texts.replace(/ /g, ''), '#', false)
        return {
          name: metricName,
          success: true,
          error_message: '',
          value: nHashtags / nPosts
        }
      } catch (err) {
        if (err instanceof InstalibError) {
          return {
            name: metricName,
            success: false,
            error_message: err.message,
            value: 0
          }
        }
        console.log(err)
        throw err
      }
    }

    async geInstagramtMeanOfMentions (): Promise<MetricResult> {
      const metricName = 'mean_of_hashtags'
      try {
        if (this.InstagramProfile === null) {
          await this.getInstagramProfile()
        }
        const posts = this.InstagramProfile.graphql.user.edge_owner_to_timeline_media.edges
        const nPosts = posts.length
        let texts = ''
        for (const post of posts) {
          for (const text of post.node.edge_media_to_caption.edges) {
            texts += text.node.text
          }
        }
        const nMentions = occurrences(texts.replace(/ /g, ''), '@', false)
        return {
          name: metricName,
          success: true,
          error_message: '',
          value: nMentions / nPosts
        }
      } catch (err) {
        if (err instanceof InstalibError) {
          return {
            name: metricName,
            success: false,
            error_message: err.message,
            value: 0
          }
        }
        console.log(err)
        throw err
      }
    }
}
