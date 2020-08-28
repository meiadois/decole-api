import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SALT } from '@config/Constants';
import { JwtPayloadI, JwtUserI } from '@shared/models/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SALT,
    });
  }

  async validate(payload: JwtPayloadI) : Promise<JwtUserI>{
    return { id: payload.sub, email: payload.email, name: payload.name };
  }
}