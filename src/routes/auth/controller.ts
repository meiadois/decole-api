import { Controller, Get, UseGuards, Post, Req, Param, Body } from '@nestjs/common';
import { LocalAuthGuard } from '@/shared/auth/local/local-auth.guard';
import { Request } from 'express';
import { AuthService } from '@shared/auth/auth.service';
import { UserI } from '@shared/models';
import { LoginInfosI } from '@/shared/models/auth';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
      ) { }
      
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req: Request): Promise<LoginInfosI> {
        return await this.authService.login(req.user as UserI);
    }

    @Post('/refresh')
    async refreshToken(@Body('refreshToken') refreshToken: string): Promise<any> {
        return await this.authService.refresh(refreshToken);
    }
}
