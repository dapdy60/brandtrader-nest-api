import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { BatchCodeDecodingResultModule } from './batch-code-decoding-result/batch-code-decoding-result.module';
import { BatchCodeFormularModule } from './batch-code-formular/batch-code-formular.module';


@Module({
  imports: [PrismaModule, ArticlesModule, BatchCodeDecodingResultModule, BatchCodeFormularModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
