import { Module } from '@nestjs/common';
import { QueueUIModule } from '@bull/ui/ui.module'
import Queues from '@bull/queues';

@Module({     
    imports: [...Queues, QueueUIModule],     
    exports: [...Queues, QueueUIModule],     
    providers: [],
})

export class BullModule { }