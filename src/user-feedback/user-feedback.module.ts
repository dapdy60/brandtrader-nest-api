import { Module } from '@nestjs/common';
import { UserFeedbackService } from './user-feedback.service';
import { UserFeedbackController } from './user-feedback.controller';

@Module({
  controllers: [UserFeedbackController],
  providers: [UserFeedbackService]
})
export class UserFeedbackModule {}
