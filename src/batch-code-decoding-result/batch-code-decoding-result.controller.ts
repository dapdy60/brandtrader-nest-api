import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BatchCodeDecodingResultService } from './batch-code-decoding-result.service';
import { CreateBatchCodeDecodingResultDto } from './dto/create-batch-code-decoding-result.dto';
import { UpdateBatchCodeDecodingResultDto } from './dto/update-batch-code-decoding-result.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BatchCodeDecodingResult } from './entities/batch-code-decoding-result.entity';


@Controller('batch-code-decoding-result')
@ApiTags('BatchCode Decoding Result')
export class BatchCodeDecodingResultController {
  constructor(private readonly batchCodeDecodingResultService: BatchCodeDecodingResultService) {}

  @Post()
  @ApiCreatedResponse({type: BatchCodeDecodingResult})
  create(@Body() createBatchCodeDecodingResultDto: CreateBatchCodeDecodingResultDto) {
    return this.batchCodeDecodingResultService.create(createBatchCodeDecodingResultDto);
  }

  @Get()
  @ApiOkResponse({type: BatchCodeDecodingResult, isArray: true})
  findAll() {
    return this.batchCodeDecodingResultService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: BatchCodeDecodingResult})
  findOne(@Param('id') id: string) {
    return this.batchCodeDecodingResultService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({type: BatchCodeDecodingResult})
  update(@Param('id') id: string, @Body() updateBatchCodeDecodingResultDto: UpdateBatchCodeDecodingResultDto) {
    return this.batchCodeDecodingResultService.update(id, updateBatchCodeDecodingResultDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: BatchCodeDecodingResult})
  remove(@Param('id') id: string) {
    return this.batchCodeDecodingResultService.remove(id);
  }
}
