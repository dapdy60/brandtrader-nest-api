import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [PrismaService],
})
export class BrandModule {}
