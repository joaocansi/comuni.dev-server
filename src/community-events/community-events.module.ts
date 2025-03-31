import { Module } from '@nestjs/common';
import { CommunityEventsController } from './community-events.controller';

@Module({
  controllers: [CommunityEventsController],
})
export class CommunityEventsModule {}
