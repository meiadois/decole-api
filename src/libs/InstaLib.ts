import axios from 'axios'
import { ErrorHandler } from '../helpers/ErrorHandler'

const InstagramApi = axios.create({
  baseURL: 'https://www.instagram.com'
})

interface JsonObject {
  [key: string]: any;
}

export class InstalibError extends Error {
  public statusCode: number;
  public message: string;
  constructor (statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
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
export interface UserInstagramProfile {
  logging_page_id: string;
  show_suggested_profiles: boolean;
  show_follow_dialog: boolean;
  graphql: Graphql;
  toast_content_on_load: null;
}

export interface Graphql {
  user: User;
}

export interface User {
  biography: string;
  blocked_by_viewer: boolean;
  restricted_by_viewer: null;
  country_block: boolean;
  external_url: null;
  external_url_linkshimmed: null;
  edge_followed_by: EdgeFollowClass;
  followed_by_viewer: boolean;
  edge_follow: EdgeFollowClass;
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
  business_category_name: null;
  category_id: null;
  overall_category_name: null;
  category_enum: null;
  is_private: boolean;
  is_verified: boolean;
  edge_mutual_followed_by: EdgeMutualFollowedBy;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  username: string;
  connected_fb_page: null;
  edge_felix_video_timeline: EdgeFelixVideoTimelineClass;
  edge_owner_to_timeline_media: EdgeFelixVideoTimelineClass;
  edge_saved_media: EdgeFelixVideoTimelineClass;
  edge_media_collections: EdgeFelixVideoTimelineClass;
  edge_related_profiles: EdgeRelatedProfilesClass;
}

export interface EdgeFelixVideoTimelineClass {
  count: number;
  page_info: PageInfo;
  edges: EdgeFelixVideoTimelineEdge[];
}

export interface EdgeFelixVideoTimelineEdge {
  node: PurpleNode;
}

export interface PurpleNode {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  display_url: string;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  media_overlay_info: null;
  media_preview: null | string;
  owner: Owner;
  is_video: boolean;
  accessibility_caption: string;
  edge_media_to_caption: EdgeRelatedProfilesClass;
  edge_media_to_comment: EdgeFollowClass;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: EdgeFollowClass;
  edge_media_preview_like: EdgeFollowClass;
  location: Location | null;
  thumbnail_src: string;
  thumbnail_resources: ThumbnailResource[];
  edge_sidecar_to_children?: EdgeSidecarToChildren;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface EdgeFollowClass {
  count: number;
}

export interface EdgeRelatedProfilesClass {
  edges: EdgeRelatedProfilesEdge[];
}

export interface EdgeRelatedProfilesEdge {
  node: FluffyNode;
}

export interface FluffyNode {
  text: string;
}

export interface EdgeSidecarToChildren {
  edges: EdgeSidecarToChildrenEdge[];
}

export interface EdgeSidecarToChildrenEdge {
  node: TentacledNode;
}

export interface TentacledNode {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  display_url: string;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  media_overlay_info: null;
  media_preview: string;
  owner: Owner;
  is_video: boolean;
  accessibility_caption: string;
}

export interface Owner {
  id: string;
  username: string;
}

export interface Location {
  id: string;
  has_public_page: boolean;
  name: string;
  slug: string;
}

export interface ThumbnailResource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface PageInfo {
  has_next_page: boolean;
  end_cursor: null;
}

export interface EdgeMutualFollowedBy {
  count: number;
  edges: any[];
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
    console.log(`[GET] to https://www.instagram.com/${nickname}${query}`)
    const data = await InstagramApi.get(`/${nickname}${query}`, {
      headers: {
        // Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45'
        // 'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((result) => {
        return result.data
      }).catch((err) => {
        if (err.response.status === 404) {
          throw new InstalibError(404, `Não foi possível encontrar informações do usuário ${nickname}`)
        }
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
