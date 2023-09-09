import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { REDIS_QUEUE_NAME } from './constants';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue(REDIS_QUEUE_NAME) private queue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processData() {
    return await this.queue.add(
      'process_data',
      { custom_id: Math.floor(Math.random() * 10000000) },
      { priority: 1 },
    );
  }
}
