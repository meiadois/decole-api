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
export interface MetricList {
  [key: string]: MetricResult;
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
  Followers = 'followers',
  Following = 'following',
  Publications = 'publications',
  MeanOfHashtags = 'mean_of_hashtags',
  MeanOfMentions = 'mean_of_mentions',
  MeanOfComments = 'mean_of_comments',
  MeanOfLikes = 'mean_of_likes',
  PostsWithHashtags = 'posts_with_hashtags'
}

export default class MetricsLib {
    private InstagramProfile: UserInstagramProfile = null

    async exceptionHandler (err: any): Promise<MetricResult> {
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

    async instagramFactory (username: string): Promise<MetricList> {
      try {
        const results: MetricList = {}

        if (this.InstagramProfile === null) {
          await this.getInstagramProfile(username)
        }

        results[PossibleMetrics.FollowersPerFollowing] = await this.getInstagramFollowersPerFollowing()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.MeanOfHashtags] = await this.geInstagramtMeanOfHashtags()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.MeanOfMentions] = await this.geInstagramtMeanOfMentions()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.PostsWithHashtags] = await this.geInstagramPostsWithHashtags()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.MeanOfComments] = await this.geInstagramMeanOfComments()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.MeanOfLikes] = await this.geInstagramMeanOfLikes()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.Followers] = await this.geInstagramFollowers()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.Following] = await this.geInstagramFollowing()
          .catch((err) => this.exceptionHandler(err))

        results[PossibleMetrics.Publications] = await this.geInstagramPublications()
          .catch((err) => this.exceptionHandler(err))
        return results
      } catch (err) {
        // if (err instanceof InstalibError) {
        //   return {
        //     success: false,
        //     error_message: err.message,
        //     value: 0
        //   }
        // }
        // console.log(err)
        // throw err
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

    async geInstagramMeanOfComments (): Promise<MetricResult> {
      const posts = this.InstagramProfile.graphql.user.edge_owner_to_timeline_media.edges
      const nPosts = posts.length
      let sumOfCommments = 0

      for (const post of posts) {
        sumOfCommments += post.node.edge_media_to_comment.count
      }
      return {
        success: true,
        error_message: '',
        value: sumOfCommments / nPosts
      }
    }

    async geInstagramFollowers (): Promise<MetricResult> {
      const followers = this.InstagramProfile.graphql.user.edge_followed_by.count
      return {
        success: true,
        error_message: '',
        value: followers
      }
    }

    async geInstagramFollowing (): Promise<MetricResult> {
      const following = this.InstagramProfile.graphql.user.edge_follow.count
      return {
        success: true,
        error_message: '',
        value: following
      }
    }

    async geInstagramPublications (): Promise<MetricResult> {
      const publications = this.InstagramProfile.graphql.user.edge_owner_to_timeline_media.count
      return {
        success: true,
        error_message: '',
        value: publications
      }
    }

    async geInstagramMeanOfLikes (): Promise<MetricResult> {
      const posts = this.InstagramProfile.graphql.user.edge_owner_to_timeline_media.edges
      const nPosts = posts.length
      let sumOfLikes = 0

      for (const post of posts) {
        sumOfLikes += post.node.edge_liked_by.count
      }
      return {
        success: true,
        error_message: '',
        value: sumOfLikes / nPosts
      }
    }
}
