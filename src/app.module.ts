import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { BatchCodeDecodingResultModule } from './batch-code-decoding-result/batch-code-decoding-result.module';
import { BatchCodeFormularModule } from './batch-code-formular/batch-code-formular.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { UserFeedbackModule } from './user-feedback/user-feedback.module';
import { BrandModule } from './brand/brand.module';


@Module({
  imports: [PrismaModule, ArticlesModule, BatchCodeDecodingResultModule, BatchCodeFormularModule, ManufacturerModule, UserFeedbackModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
