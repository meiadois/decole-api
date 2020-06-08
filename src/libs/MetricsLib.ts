import InstaLib, { UserInstagramProfile, InstalibError } from './InstaLib'
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
export enum PossibleMetrics{
  FollowersPerFollowing = 'followers_per_following',
  MeanOfHashtags = 'mean_of_hashtags',
  MeanOfMentions = 'mean_of_mentions',
  PostsWithHashtags = 'posts_with_hashtags'
}
export default class MetricsLib {
    private username: string
    private InstagramProfile: UserInstagramProfile = null
    constructor (username: string) {
      this.username = username
    }

    async metricFactory (username: string, metric_name: string): Promise<MetricResult> {
      try {
        if (metric_name === PossibleMetrics.FollowersPerFollowing) {
          console.log(`Getting ${PossibleMetrics.FollowersPerFollowing}`)

          if (this.InstagramProfile === null) {
            await this.getInstagramProfile(username)
          }

          return await this.getInstagramFollowersPerFollowing()
        }

        if (metric_name === PossibleMetrics.MeanOfHashtags) {
          console.log(`Getting ${PossibleMetrics.MeanOfHashtags}`)
          if (this.InstagramProfile === null) {
            await this.getInstagramProfile(username)
          }
          return await this.geInstagramtMeanOfHashtags()
        }

        if (metric_name === PossibleMetrics.MeanOfMentions) {
          if (this.InstagramProfile === null) {
            await this.getInstagramProfile(username)
          }
          return await this.geInstagramtMeanOfMentions()
        }

        if (metric_name === PossibleMetrics.PostsWithHashtags) {
          if (this.InstagramProfile === null) {
            await this.getInstagramProfile(username)
          }
          return await this.geInstagramPostsWithHashtags()
        }
      } catch (err) {
        if (err instanceof InstalibError) {
          return {
            success: false,
            error_message: err.message,
            value: 0
          }
        }
        console.log(err)
        throw err
      }
    }

    async getInstagramProfile (username: string): Promise<void> {
      this.InstagramProfile = await InstaLib.getUserProfileByNickname(username)
    }

    async getInstagramFollowersPerFollowing (): Promise<MetricResult> {
      const following = this.InstagramProfile.graphql.user.edge_follow.count
      const followers = this.InstagramProfile.graphql.user.edge_followed_by.count
      return {
        success: true,
        error_message: '',
        value: followers / following
      }
    }

    async geInstagramtMeanOfHashtags (): Promise<MetricResult> {
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
        success: true,
        error_message: '',
        value: nHashtags / nPosts
      }
    }

    async geInstagramtMeanOfMentions (): Promise<MetricResult> {
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
        success: true,
        error_message: '',
        value: nMentions / nPosts
      }
    }

    async geInstagramPostsWithHashtags (): Promise<MetricResult> {
      const posts = this.InstagramProfile.graphql.user.edge_owner_to_timeline_media.edges
      const nPosts = posts.length
      let postsWithHashtags = 0

      for (const post of posts) {
        for (const text of post.node.edge_media_to_caption.edges) {
          if (occurrences(text.node.text.replace(/ /g, ''), '#', false) > 0) {
            postsWithHashtags++
            break
          }
        }
      }
      return {
        success: true,
        error_message: '',
        value: postsWithHashtags / nPosts
      }
    }
}
