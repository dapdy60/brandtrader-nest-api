import { Injectable } from '@nestjs/common';
import { CreateUserFeedbackDto } from './dto/create-user-feedback.dto';
import { UpdateUserFeedbackDto } from './dto/update-user-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserFeedbackService {
  constructor(private prisma: PrismaService) {}
  create(createUserFeedbackDto: CreateUserFeedbackDto) {
    return this.prisma.userFeedback.create({ data: createUserFeedbackDto });
  }

  findAll() {
    return this.prisma.userFeedback.findMany({ where: { isDeleted: false || null }});
  }

  findOne(id: string) {
    return this.prisma.userFeedback.findUnique({ where: { id } });
  }

  update(id: string, updateUserFeedbackDto: UpdateUserFeedbackDto) {
    return this.prisma.userFeedback.update({ where: { id }, data: updateUserFeedbackDto });
  }

  remove(id: string) {
    return this.prisma.userFeedback.update({ where: { id }, data: { isDeleted: true } });
  }
}
