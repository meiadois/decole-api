import { NextFunction, Response, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import CustomError from '@utils/CustomError'

interface User {
    id: number;
    email: string;
    name: string;
    paid_access: boolean;
    role: string;
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

  authorize (req: Request, res: Response, next: NextFunction): void {
    let token = req.headers['x-access-token']
    if (!token) {
      throw new CustomError(401, 'Token inválido')
    } else {
      token = token as string
      jwt.verify(token, String(process.env.SALT_KEY), async function (err, decoded) {
        if (err) {
          console.log(err)
          return next(new CustomError(401, 'Token inválido'))
        }
        const token_infos = decoded as TokenInfos
        res.locals.user = token_infos.user
        next()
      })
    }
  }

  authorizeAdmin (req: Request, res: Response, next: NextFunction): void {
    let token = req.headers['x-access-token']
    if (!token) {
      throw new CustomError(401, 'Token inválido')
    } else {
      token = token as string
      jwt.verify(token, String(process.env.SALT_KEY), async function (err, decoded) {
        if (err) {
          console.log(err)
          return next(new CustomError(401, 'Token inválido'))
        }
        const token_infos = decoded as TokenInfos
        if (token_infos.user.role !== 'admin') {
          return next(new CustomError(401, 'Você precisa ser um administrador para acessar esta rota'))
        }
        res.locals.user = token_infos.user
        next()
      })
    }
  }
}
export default new AuthService()
