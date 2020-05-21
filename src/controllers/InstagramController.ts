import { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../helpers/ErrorHandler'
import InstaLib from '../libs/InstaLib'
interface JsonObject {
  [key: string]: any;
}
class InstagramController {
  async getUserByNickname (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      let { nickname } = req.query
      nickname = nickname as string
      const user = await InstaLib.getUserByNickname(nickname)
      return res.json(user)
    } catch (err) {
      next(err)
    }
  }

  async getUserProfileByNickname (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      let { nickname } = req.query
      nickname = nickname as string
      const user_profile = await InstaLib.getUserProfileByNickname(nickname)
      /*
      const user = user_profile.graphql.user
      const user_processed: JsonObject = {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        biography: user.biography,
        followed_by: user.edge_followed_by.count,
        follow: user.edge_follow.count,
        profile_pic_url: user.profile_pic_url,
        profile_pic_url_hd: user.profile_pic_url_hd,
        category: {
          business_category_name: user.business_category_name,
          category_id: user.category_id,
          overall_category_name: user.overall_category_name
        },
        booleans: {
          is_business_account: user.is_business_account,
          is_joined_recently: user.is_joined_recently,
          is_private: user.is_private,
          is_verified: user.is_verified
        },
        external_url: user.external_url,
        external_url_linkshimmed: user.external_url_linkshimmed,
        connected_fb_page: user.connected_fb_page,
        publications: {
          count: user.edge_owner_to_timeline_media.count,
          items: []
        }

      }

      user.edge_owner_to_timeline_media.edges.forEach((edge: any) => {
        const node = edge.node

        const obj: JsonObject = {
          id: node.id,
          title: node.edge_media_to_caption.edges[0].node.text,
          comments: {
            count: node.edge_media_to_comment.count
          },
          likes: {
            count: node.edge_liked_by.count
          },
          dimentions: node.dimentions,
          display_url: node.display_url,
          media_preview: node.media_preview,
          is_video: node.is_video,
          accessibility_caption: node.accessibility_caption,
          comments_is_disabled: node.comments_disabled,
          taken_at_timestamp: node.taken_at_timestamp,
          location: node.location
        }
        user_processed.publications.items.push(obj)
      }) */
      return res.json(user_profile)
    } catch (err) {
      next(err)
    }
  }
}
export default new InstagramController()