import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserI } from '@shared/models';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadI, LoginInfosI, JwtPayload } from '../models/auth';
import { JWT_REFRESH_EXPIRATION_IN_HOURS } from '@/config/Constants';
import { Cast } from '@/utils/CastUtils';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
  ) { }
  async validateUser(userEmail: string, userPassword: string): Promise<UserI>  {
    const user: UserI = {
        email: userEmail, 
        name: userEmail,
        password: '1234',
        id: '1'
    } // TODO Find user by email
    if(user.password === userPassword){
        return user
    }
    return null;
  }
  
    async login(user: UserI): Promise<LoginInfosI> {
      const tokenInfos: JwtPayloadI = {
        sub: user.id,
        email: user.email,
        name: user.name
      };

      return {
        accessToken: this.jwtService.sign(tokenInfos),
        refreshToken: this.jwtService.sign(tokenInfos, {
          expiresIn: `${JWT_REFRESH_EXPIRATION_IN_HOURS}h`
        }),
      };
    }

    async refresh(refreshToken: string): Promise<LoginInfosI> {
       // const tokenInfos: JwtPayload = Cast(await this.jwtService.decode(refreshToken), new JwtPayload())

      try{
        const decoded = this.jwtService.verify(refreshToken)
        const tokenInfos: JwtPayload = Cast(decoded, new JwtPayload())
        
        return {
          accessToken: this.jwtService.sign(tokenInfos),
          refreshToken: this.jwtService.sign(tokenInfos, {
            expiresIn: `${JWT_REFRESH_EXPIRATION_IN_HOURS}h`
          })
        };
      }catch(e){
        if(e instanceof TokenExpiredError){
          throw new UnauthorizedException('Token expirado!');
        }

        throw new UnauthorizedException('Token inválido!');
      }
      
    }
}
