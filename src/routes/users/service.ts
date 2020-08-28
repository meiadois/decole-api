import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class UsersService {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue){}
  
  async getHello(): Promise<string> {
    await this.emailQueue.add('sendMail', {
      email: 'guiscunha@gmail.com',
      message: 'Uma msg.'
    }, {
      delay: 10000
    });
    return 'Hello World!';
  }
}
