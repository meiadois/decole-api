
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('emailQueue')
export class EmailProcessor {
    @OnQueueActive()
    onActive(job: Job): void {
        console.log(
        `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }
    
    @Process('sendMail')
    async sendMail(job: Job<unknown>): Promise<void> {
        // Send the email
        console.log("enviado")
        job.progress(100)
    }
}