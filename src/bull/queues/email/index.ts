import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullConfig } from '@config/Bull';
import { EmailProcessor } from './processor'


const EmailQueue = BullModule.registerQueueAsync({
  name: 'emailQueue',
  useClass: BullConfig,
})
@Module({
  imports: [
    EmailQueue
  ],
  exports: [
    EmailQueue, EmailProcessor
  ],
  providers: [
    EmailProcessor
  ],
})
export class EmailQueueModule {}
