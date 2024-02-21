import { Module } from '@nestjs/common';
import { BatchCodeFormularService } from './batch-code-formular.service';
import { BatchCodeFormularController } from './batch-code-formular.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [BatchCodeFormularController],
  providers: [BatchCodeFormularService],
  imports: [PrismaModule],
})
export class BatchCodeFormularModule {}
