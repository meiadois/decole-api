import axios from 'axios'
import { HandleError, ErrorHandler } from '../helpers/ErrorHandler'

const InstagramApi = axios.create({
  baseURL: 'https://www.instagram.com'
})

interface JsonObject {
  [key: string]: any;
}
export interface UserInstagramSimpleProfile {
  pk: string;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_id: string;
  is_verified: boolean;
  has_anonymous_profile_picture: boolean;
  mutual_followers_count: number;
  latest_reel_media: number;

}
export interface EdgeFollowedBy {
  count: number;
}

export interface EdgeFollow {
  count: number;
}

export interface EdgeMutualFollowedBy {
  count: number;
  edges: any[];
}

export interface PageInfo {
  has_next_page: boolean;
  end_cursor: string;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Owner {
  id: string;
  username: string;
}

export interface Node2 {
  text: string;
}

export interface Edge2 {
  node: Node2;
}

export interface EdgeMediaToCaption {
  edges: Edge2[];
}

export interface EdgeMediaToComment {
  count: number;
}

export interface EdgeLikedBy {
  count: number;
}

export interface EdgeMediaPreviewLike {
  count: number;
}

export interface ThumbnailResource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface FelixProfileGridCrop {
  crop_left: number;
  crop_right: number;
  crop_top: number;
  crop_bottom: number;
}

export interface Node {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  display_url: string;
  gating_info?: any;
  fact_check_overall_rating?: any;
  fact_check_information?: any;
  media_preview: string;
  owner: Owner;
  is_video: boolean;
  accessibility_caption?: any;
  edge_media_to_caption: EdgeMediaToCaption;
  edge_media_to_comment: EdgeMediaToComment;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: EdgeLikedBy;
  edge_media_preview_like: EdgeMediaPreviewLike;
  location?: any;
  thumbnail_src: string;
  thumbnail_resources: ThumbnailResource[];
  felix_profile_grid_crop: FelixProfileGridCrop;
  encoding_status?: any;
  is_published: boolean;
  product_type: string;
  title: string;
  video_duration: number;
  video_view_count: number;
}

export interface Edge {
  node: Node;
}

export interface EdgeFelixVideoTimeline {
  count: number;
  page_info: PageInfo;
  edges: Edge[];
}

export interface PageInfo2 {
  has_next_page: boolean;
  end_cursor: string;
}

export interface Dimensions2 {
  height: number;
  width: number;
}

export interface Owner2 {
  id: string;
  username: string;
}

export interface Node4 {
  text: string;
}

export interface Edge4 {
  node: Node4;
}

export interface EdgeMediaToCaption2 {
  edges: Edge4[];
}

export interface EdgeMediaToComment2 {
  count: number;
}

export interface EdgeLikedBy2 {
  count: number;
}

export interface EdgeMediaPreviewLike2 {
  count: number;
}

export interface ThumbnailResource2 {
  src: string;
  config_width: number;
  config_height: number;
}

export interface FelixProfileGridCrop2 {
  crop_left: number;
  crop_right: number;
  crop_top: number;
  crop_bottom: number;
}

export interface Node3 {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions2;
  display_url: string;
  gating_info?: any;
  fact_check_overall_rating?: any;
  fact_check_information?: any;
  media_preview: string;
  owner: Owner2;
  is_video: boolean;
  accessibility_caption: string;
  edge_media_to_caption: EdgeMediaToCaption2;
  edge_media_to_comment: EdgeMediaToComment2;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: EdgeLikedBy2;
  edge_media_preview_like: EdgeMediaPreviewLike2;
  location?: any;
  thumbnail_src: string;
  thumbnail_resources: ThumbnailResource2[];
  felix_profile_grid_crop: FelixProfileGridCrop2;
  video_view_count: number;
}

export interface Edge3 {
  node: Node3;
}

export interface EdgeOwnerToTimelineMedia {
  count: number;
  page_info: PageInfo2;
  edges: Edge3[];
}

export interface PageInfo3 {
  has_next_page: boolean;
  end_cursor?: any;
}

export interface EdgeSavedMedia {
  count: number;
  page_info: PageInfo3;
  edges: any[];
}

export interface PageInfo4 {
  has_next_page: boolean;
  end_cursor?: any;
}

export interface EdgeMediaCollections {
  count: number;
  page_info: PageInfo4;
  edges: any[];
}

export interface User {
  biography: string;
  blocked_by_viewer: boolean;
  restricted_by_viewer?: any;
  country_block: boolean;
  external_url: string;
  external_url_linkshimmed: string;
  edge_followed_by: EdgeFollowedBy;
  followed_by_viewer: boolean;
  edge_follow: EdgeFollow;
  follows_viewer: boolean;
  full_name: string;
  has_ar_effects: boolean;
  has_channel: boolean;
  has_blocked_viewer: boolean;
  highlight_reel_count: number;
  has_requested_viewer: boolean;
  id: string;
  is_business_account: boolean;
  is_joined_recently: boolean;
  business_category_name: string;
  category_id: string;
  overall_category_name?: any;
  is_private: boolean;
  is_verified: boolean;
  edge_mutual_followed_by: EdgeMutualFollowedBy;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  username: string;
  connected_fb_page?: any;
  edge_felix_video_timeline: EdgeFelixVideoTimeline;
  edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
  edge_saved_media: EdgeSavedMedia;
  edge_media_collections: EdgeMediaCollections;
}

export interface Graphql {
  user: User;
}

export interface UserInstagramProfile {
  logging_page_id: string;
  show_suggested_profiles: boolean;
  show_follow_dialog: boolean;
  graphql: Graphql;
  toast_content_on_load?: any;
}

class InstaLib {
  async getUserByNickname (nickname: string): Promise<UserInstagramSimpleProfile> {
    /// web/search/topsearch/?context=user&count=0&query={{ user_name  }}
    const query = this.convertObjectToQueryString({
      context: 'user',
      count: '0',
      query: nickname
    })

    const data = await InstagramApi.get(`/web/search/topsearch${query}`, {})
      .then((result) => {
        return result.data.users[0].user
      }).catch((err) => {
        console.log(err)
        return null
      })
    if (data == null) {
      throw new ErrorHandler(404, `Não foi possível encontrar informações do usuário ${nickname}`)
    }
    return data as UserInstagramSimpleProfile
  }

  async getUserProfileByNickname (nickname: string): Promise<UserInstagramProfile> {
    /// web/search/topsearch/?context=user&count=0&query={{ user_name  }}
    const query = this.convertObjectToQueryString({
      __a: '1'
    })

    const data = await InstagramApi.get(`/${nickname}${query}`, {})
      .then((result) => {
        return result.data
      }).catch((err) => {
        console.log(err)
        return null
      })
    if (data == null) {
      throw new ErrorHandler(404, `Não foi possível encontrar informações do usuário ${nickname}`)
    }
    return data as UserInstagramProfile
  }

  convertObjectToQueryString (obj: JsonObject): string {
    // Clone the object obj and loose the reference
    obj = Object.create(obj)
    let result = '?'
    for (const i in obj) {
      result += i + '='
      if (obj[i] !== undefined) {
        if (Array.isArray(obj[i])) {
          result += obj[i].join() + '&'
        } else {
          result += obj[i] + '&'
        }
      }
    }
    if (result[result.length - 1] === '&') {
      result = result.substr(0, result.length - 1)
    }
    if (result === '?') { result = '' }
    return result
  }
}
export default new InstaLib()
