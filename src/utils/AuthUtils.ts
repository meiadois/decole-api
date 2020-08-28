import * as jwt from 'jsonwebtoken'
import { JWT_SALT } from '@config/Constants';

interface User {
    id: number;
    email: string;
    name: string;
    paid_access: boolean;
    role: string;
}
export interface TokenInfos {
    user: User;
}

class AuthUtils {
  async generateToken (data: TokenInfos): Promise<string> {
    return jwt.sign(data, JWT_SALT, { expiresIn: '600d' })
  }

  async decodeToken (token: string): Promise<TokenInfos> {
    const data = await jwt.verify(token, JWT_SALT) as TokenInfos
    return data
  }
}
export default new AuthUtils()
