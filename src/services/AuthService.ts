import { NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { ErrorHandler } from '../helpers/error'

interface User {
    id: number;
    email: string;
    name: string;
    paid_access: boolean;
}
interface TokenInfos {
    user: User;
}
class AuthService {
  async generateToken (data: TokenInfos): Promise<string> {
    return jwt.sign(data, String(process.env.SALT_KEY), { expiresIn: '600d' })
  }

  async decodeToken (token: string): Promise<TokenInfos> {
    const data = await jwt.verify(token, String(process.env.SALT_KEY)) as TokenInfos
    return data
  }

  authorize (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.get('x-access-token')
    if (!token) {
      throw new ErrorHandler(401, 'Token inválido')
    } else {
      jwt.verify(token, String(process.env.SALT_KEY), async function (err, decoded) {
        if (err) {
          console.log(err)
          return next(new ErrorHandler(401, 'Token inválido'))
        }
        const token_infos = decoded as TokenInfos
        const ID_HEADER_KEY = '_user_id_'
        res.headers.set(ID_HEADER_KEY, String(token_infos.user.id))
        next()
      })
    }
  }
}
export default new AuthService()
