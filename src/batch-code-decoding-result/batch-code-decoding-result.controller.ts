import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BatchCodeDecodingResultService } from './batch-code-decoding-result.service';
import { CreateBatchCodeDecodingResultDto } from './dto/create-batch-code-decoding-result.dto';
import { UpdateBatchCodeDecodingResultDto } from './dto/update-batch-code-decoding-result.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BatchCodeDecodingResultEntity } from './entities/batch-code-decoding-result.entity';
import { DecodeResult } from 'src/batch-code-decoding-result/utils/DecodeResult';

@Controller('batch-code-decoding-result')
@ApiTags('Batch Code Decoding Result')
export class BatchCodeDecodingResultController {
  constructor(private readonly batchCodeDecodingResultService: BatchCodeDecodingResultService) {}

  @Post()  
  @ApiCreatedResponse({ type: BatchCodeDecodingResultEntity })
  create(@Body() createBatchCodeDecodingResultDto: CreateBatchCodeDecodingResultDto) {
    return this.batchCodeDecodingResultService.create(createBatchCodeDecodingResultDto);
  }
  @Post('decode')  
  @ApiCreatedResponse({ type: BatchCodeDecodingResultEntity })
  decode(@Body() createBatchCodeDecodingResultDto: CreateBatchCodeDecodingResultDto) {
    return this.batchCodeDecodingResultService.decode(createBatchCodeDecodingResultDto);
  }

  // @Post('decode')
  // @ApiCreatedResponse({ type: DecodeResult })
  // decode(@Body() createBatchCodeDecoderDto: CreateBatchCodeDecoderDto) {
  //   return this.batchCodeDecodingResultService.decode(createBatchCodeDecoderDto);
  // }

  @Get()
  @ApiOkResponse({ type: BatchCodeDecodingResultEntity, isArray: true })
  findAll() {
    return this.batchCodeDecodingResultService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BatchCodeDecodingResultEntity })
  findOne(@Param('id') id: string) {
    return this.batchCodeDecodingResultService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: BatchCodeDecodingResultEntity })
  update(@Param('id') id: string, @Body() updateBatchCodeDecodingResultDto: UpdateBatchCodeDecodingResultDto) {
    return this.batchCodeDecodingResultService.update(id, updateBatchCodeDecodingResultDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BatchCodeDecodingResultEntity })
  remove(@Param('id') id: string) {
    return this.batchCodeDecodingResultService.remove(id);
  }
}
