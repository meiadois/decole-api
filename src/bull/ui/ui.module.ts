import { Module } from '@nestjs/common';
import Queues from '@bull/queues'
import { QueueUIProvider } from './ui.provider';

@Module({     
    imports: [...Queues],     
    exports: [],     
    providers: [QueueUIProvider],
})

export class QueueUIModule { }
