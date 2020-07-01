import { Request, Response, NextFunction } from 'express'
// import { CustomError } from '@helpers/CustomError'
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
      return res.json(user_profile)
    } catch (err) {
      next(err)
    }
  }
}
export default new InstagramController()
