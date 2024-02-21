import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ManufacturerService {
  constructor(private prisma: PrismaService) {}

  create(createManufacturerDto: CreateManufacturerDto) {
    return this.prisma.manufacturer.create({ data: createManufacturerDto });
  }

  findAll() {
    return this.prisma.manufacturer.findMany({ where: { isDeleted: false || null }});
  }

  findOne(id: string) {
    return this.prisma.manufacturer.findUnique({ where: { id } });
  }

  update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    return this.prisma.manufacturer.update({ where: { id }, data: updateManufacturerDto });
  }

  remove(id: string) {
    return this.prisma.manufacturer.update({ where: { id }, data: { isDeleted: true } });
  }
}
