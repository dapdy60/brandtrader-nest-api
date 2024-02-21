import { Module } from '@nestjs/common';
import { UserFeedbackService } from './user-feedback.service';
import { UserFeedbackController } from './user-feedback.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserFeedbackController],
  providers: [UserFeedbackService],
  imports: [PrismaModule],
})
export class UserFeedbackModule {}
