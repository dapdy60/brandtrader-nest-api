import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BrandEntity } from './entities/brand.entity';

@Controller('brand')
@ApiTags('Brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiCreatedResponse({ type: BrandEntity })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOkResponse({ type: BrandEntity, isArray: true })
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BrandEntity })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: BrandEntity })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BrandEntity })
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
