import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BatchCodeFormularService } from './batch-code-formular.service';
import { CreateBatchCodeFormularDto } from './dto/create-batch-code-formular.dto';
import { UpdateBatchCodeFormularDto } from './dto/update-batch-code-formular.dto';
import { BatchCodeFormularEntity } from './entities/batch-code-formular.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('batch-code-formular')
@ApiTags('Batch Code Formular')
export class BatchCodeFormularController {
  constructor(private readonly batchCodeFormularService: BatchCodeFormularService) {}

  @Post()
  @ApiCreatedResponse({ type: BatchCodeFormularEntity })
  create(@Body() createBatchCodeFormularDto: CreateBatchCodeFormularDto) {
    return this.batchCodeFormularService.create(createBatchCodeFormularDto);
  }

  @Get()
  @ApiOkResponse({ type: BatchCodeFormularEntity, isArray: true })
  findAll() {
    return this.batchCodeFormularService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BatchCodeFormularEntity })
  findOne(@Param('id') id: string) {
    return this.batchCodeFormularService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: BatchCodeFormularEntity })
  update(@Param('id') id: string, @Body() updateBatchCodeFormularDto: UpdateBatchCodeFormularDto) {
    return this.batchCodeFormularService.update(id, updateBatchCodeFormularDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchCodeFormularService.remove(id);
  }
}
