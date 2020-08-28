import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@config';


import Controllers from '@routes/controllers'
import Services from '@routes/services'
import Entities from '@database/entity'
import { BullModule } from '@bull/bull.module';
import { AuthModule } from '@shared/auth/auth.module';
import { LoggerModule } from '@shared/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot(),
    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: () => DatabaseConfig,
    }),
    TypeOrmModule.forFeature(Entities),
    BullModule,
    AuthModule
  ],
  providers: [
    ...Services
  ],
  controllers: [
    ...Controllers
  ],
  
})
export class AppModule {}
