import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { REDIS_QUEUE_NAME } from './constants';
import { ProcessDataConsumer } from './process-data.consumer';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_SERVER || 'redis', // use the service name from docker-compose if its different
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: REDIS_QUEUE_NAME,
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    BullBoardModule.forFeature({
      name: REDIS_QUEUE_NAME,
      adapter: BullAdapter,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProcessDataConsumer],
})
export class AppModule {}
