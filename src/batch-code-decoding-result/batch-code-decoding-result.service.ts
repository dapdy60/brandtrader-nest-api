import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBatchCodeDecodingResultDto } from './dto/create-batch-code-decoding-result.dto';
import { UpdateBatchCodeDecodingResultDto } from './dto/update-batch-code-decoding-result.dto';

@Injectable()
export class BatchCodeDecodingResultService {
  constructor(private prisma: PrismaService) {}

  async create(createBatchCodeDecodingResultDto: CreateBatchCodeDecodingResultDto) {
    // Call Prisma create method with the DTO data
    return this.prisma.batchCodeDecodingResult.create({ data: createBatchCodeDecodingResultDto });
  }

  findAll() {
    return this.prisma.batchCodeDecodingResult.findMany({where : {isDeleted: false}});
  }

  findOne(id: string) {
    return this.prisma.batchCodeDecodingResult.findUnique({where : {id: id}});
  }

  update(id: string, updateBatchCodeDecodingResultDto: UpdateBatchCodeDecodingResultDto) {
    return this.prisma.batchCodeDecodingResult.update({where : {id: id}, data: updateBatchCodeDecodingResultDto});
  }

  remove(id: string) {
    return this.prisma.batchCodeDecodingResult.update({where : {id: id}, data: {isDeleted: true}});
  }
}
