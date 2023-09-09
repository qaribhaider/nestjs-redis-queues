import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import { REDIS_QUEUE_NAME } from './constants';
import { Logger } from '@nestjs/common';

@Processor(REDIS_QUEUE_NAME)
export class ProcessDataConsumer {
  @Process('process_data')
  async processData() {
    // Perform the job
    // This is just a sample long running process
    // will take between 5 to 10 seconds to finish
    await new Promise((resolve, reject) => {
      try {
        setTimeout(
          () => {
            resolve('Data processed');
          },
          5000 + Math.floor(Math.random() * 5000),
        );
      } catch (error) {
        reject(error);
      }
    });

    return { done: true };
  }

  @OnQueueActive()
  onActive(job: Job<unknown>) {
    // Log that job is starting
    Logger.log(`Starting job ${job.id} : ${job.data['custom_id']}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job<unknown>) {
    // Log job completion status
    Logger.log(`Job ${job.id} has been finished`);
  }
}
