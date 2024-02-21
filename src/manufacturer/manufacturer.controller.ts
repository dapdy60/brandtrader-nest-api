import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ManufacturerEntity } from './entities/manufacturer.entity';

@Controller('manufacturer')
@ApiTags('Manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  @ApiCreatedResponse({ type: ManufacturerEntity })
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.create(createManufacturerDto);
  }

  @Get()
  @ApiOkResponse({ type: ManufacturerEntity, isArray: true })
  findAll() {
    return this.manufacturerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ManufacturerEntity })
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ManufacturerEntity })
  update(@Param('id') id: string, @Body() updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerService.update(id, updateManufacturerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ManufacturerEntity })
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(id);
  }
}
