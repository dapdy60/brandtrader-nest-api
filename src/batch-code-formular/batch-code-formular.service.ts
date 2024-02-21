import { Injectable } from '@nestjs/common';
import { CreateBatchCodeFormularDto } from './dto/create-batch-code-formular.dto';
import { UpdateBatchCodeFormularDto } from './dto/update-batch-code-formular.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BatchCodeFormularService {
  constructor(private prisma: PrismaService) {}
  create(createBatchCodeFormularDto: CreateBatchCodeFormularDto) {
    return this.prisma.batchCodeFormular.create({ data: createBatchCodeFormularDto });
  }

  findAll() {
    return this.prisma.batchCodeFormular.findMany({ where: { isDeleted: false || null }});
  }

  findOne(id: string) {
    return this.prisma.batchCodeFormular.findUnique({ where: { id } });
  }

  update(id: string, updateBatchCodeFormularDto: UpdateBatchCodeFormularDto) {
    return this.prisma.batchCodeFormular.update({
      where: { id },
      data: updateBatchCodeFormularDto,
    });
  }

  remove(id: string) {
    return this.prisma.batchCodeFormular.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
