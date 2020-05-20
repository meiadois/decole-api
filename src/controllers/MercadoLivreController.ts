import { Request, Response, NextFunction } from 'express'
// import { ErrorHandler } from '../helpers/ErrorHandler'
import Melif, { UserByNicknameInfos, UserReputation } from '../libs/MelifLib'

class MercadoLivreController {
  async getUserByNickname (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { nickname } = req.query
      const user = await Melif.getUserByNickname(nickname) as UserByNicknameInfos
      return res.json(user)
    } catch (err) {
      next(err)
    }
  }

  async getUserReputationByNickname (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { nickname } = req.query
      const user = await Melif.getUserByNickname(nickname) as UserByNicknameInfos
      const reputation = await Melif.getUserReputationById(user.seller.id) as UserReputation
      return res.json(reputation)
    } catch (err) {
      next(err)
    }
  }
}

export default new MercadoLivreController()
