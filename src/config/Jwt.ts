import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";
import { JWT_SALT, JWT_EXPIRATION_IN_HOURS } from "./Constants";

export class JwtConfig implements JwtOptionsFactory {
    createJwtOptions(): JwtModuleOptions {
      return {
        secret: JWT_SALT,
        signOptions: {
          expiresIn: `${JWT_EXPIRATION_IN_HOURS}h`
        }
      };
    }
  }