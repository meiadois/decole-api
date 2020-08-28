import { Module } from '@nestjs/common';
import { Logger } from './Logger';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}