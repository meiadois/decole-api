import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { UsersService } from './service';
import { LocalAuthGuard } from '@/shared/auth/local/local-auth.guard';
import { JwtAuthGuard } from '@/shared/auth/jwt/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService
    ) {}

  
  @Get('/')
  async getHello(): Promise<string> {
    return await this.service.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Req() req: Request): Promise<any> {
    return req.user;
  }
}
