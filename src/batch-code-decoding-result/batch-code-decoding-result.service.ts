import { Injectable } from '@nestjs/common';
import { CreateBatchCodeDecodingResultDto } from './dto/create-batch-code-decoding-result.dto';
import { UpdateBatchCodeDecodingResultDto } from './dto/update-batch-code-decoding-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BatchCodeService, DecodeResult } from 'src/batch-code-decoding-result/utils/batchcodeDecodingLogic';
import { BatchCodeDecoderDto } from './dto/batch-code-decoder-dto';

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

  decode(createBatchCodeDecodingResultDto: CreateBatchCodeDecodingResultDto): Promise<DecodeResult> {
    const batchCodeService = new BatchCodeService();
    const createBatchCodeDecoderDto : BatchCodeDecoderDto = {
      batchCode: createBatchCodeDecodingResultDto.inputBatchCode,
      brand: createBatchCodeDecodingResultDto.brandName,
      brandId: createBatchCodeDecodingResultDto.brandId,
      productType: createBatchCodeDecodingResultDto.productType
    };
    
    
    const res = batchCodeService.decodeBatch(createBatchCodeDecoderDto)
      .then((decodeResult) => {
        console.log('Decode Result:', decodeResult);
        if(!decodeResult.hasError) {
          //save the resu
          createBatchCodeDecodingResultDto.responseDictionaryJson = JSON.stringify(decodeResult); 
          //Todo: save decoder  batchCodeCalculationFormularId
          this.create(createBatchCodeDecodingResultDto);
        }
        return decodeResult;
      })
      .catch((error) => {
        console.error('Error while decoding:', error);
        return {
          output: error.message || 'Unknown error occurred during decoding',
          hasError: true
        };
      });
      return res;
  }  
}
