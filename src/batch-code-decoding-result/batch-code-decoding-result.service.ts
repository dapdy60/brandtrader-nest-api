import { Injectable } from '@nestjs/common';
import { CreateBatchCodeDecodingResultDto } from './dto/create-batch-code-decoding-result.dto';
import { UpdateBatchCodeDecodingResultDto } from './dto/update-batch-code-decoding-result.dto';

@Injectable()
export class BatchCodeDecodingResultService {
  create(createBatchCodeDecodingResultDto: CreateBatchCodeDecodingResultDto) {
    return 'This action adds a new batchCodeDecodingResult';
  }

  findAll() {
    return `This action returns all batchCodeDecodingResult`;
  }

  findOne(id: string) {
    return `This action returns a #${id} batchCodeDecodingResult`;
  }

  update(id: string, updateBatchCodeDecodingResultDto: UpdateBatchCodeDecodingResultDto) {
    return `This action updates a #${id} batchCodeDecodingResult`;
  }

  remove(id: string) {
    return `This action removes a #${id} batchCodeDecodingResult`;
  }
}
