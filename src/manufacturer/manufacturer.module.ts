import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  imports: [PrismaService],
})
export class ManufacturerModule {}
