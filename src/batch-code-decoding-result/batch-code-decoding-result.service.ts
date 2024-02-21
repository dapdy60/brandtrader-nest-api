import { Injectable } from '@nestjs/common';
import { CreateBatchCodeDecodingResultDto } from './dto/create-batch-code-decoding-result.dto';
import { UpdateBatchCodeDecodingResultDto } from './dto/update-batch-code-decoding-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BatchCodeDecodingResultService {
  constructor(private prisma: PrismaService) {}

  create(createBatchCodeDecodingResultDto: CreateBatchCodeDecodingResultDto) {
    return this.prisma.batchCodeDecodingResult.create({ data: createBatchCodeDecodingResultDto });
  }

  findAll() {
    return this.prisma.batchCodeDecodingResult.findMany({ where: { isDeleted: false || null }});
  }

  findOne(id: string) {
    return this.prisma.batchCodeDecodingResult.findUnique({ where: { id } });
  }

  update(id: string, updateBatchCodeDecodingResultDto: UpdateBatchCodeDecodingResultDto) {
    return this.prisma.batchCodeDecodingResult.update({
      where: { id },
      data: updateBatchCodeDecodingResultDto,
    });
  }

  remove(id: string) {
    return this.prisma.batchCodeDecodingResult.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
