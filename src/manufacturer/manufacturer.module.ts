import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  imports: [PrismaModule],
})
export class ManufacturerModule {}
