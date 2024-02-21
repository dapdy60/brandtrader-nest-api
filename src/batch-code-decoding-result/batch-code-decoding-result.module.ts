import { Module } from '@nestjs/common';
import { BatchCodeDecodingResultService } from './batch-code-decoding-result.service';
import { BatchCodeDecodingResultController } from './batch-code-decoding-result.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [BatchCodeDecodingResultController],
  providers: [BatchCodeDecodingResultService],
  imports: [PrismaModule]
})
export class BatchCodeDecodingResultModule {}
