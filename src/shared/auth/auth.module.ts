import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule, JwtService } from '@nestjs/jwt'
import { JwtConfig } from "@config/Jwt";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [
        NestJwtModule.registerAsync({
            useClass: JwtConfig,
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [
        AuthService
    ]
  })
  export class AuthModule {}