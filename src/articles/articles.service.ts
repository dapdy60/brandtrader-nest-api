import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    // return this.prisma.article.create({ data: createArticleDto });
    return "Created article successfully!";
  }

  findDrafts() {
    //return this.prisma.article.findMany({ where: { published: false } });
    return "Found drafts successfully!";
  }

  findAll() {
    //return this.prisma.article.findMany({ where: { published: true } });
    return "Found all articles successfully!";
  }

  findOne(id: number) {
    //return this.prisma.article.findUnique({ where: { id } });
    return "Found article by id successfully!";
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    // return this.prisma.article.update({
    //   where: { id },
    //   data: updateArticleDto,
    // });
    return "Updated article successfully!";
  }

  remove(id: number) {
    //return this.prisma.article.delete({ where: { id } });
    return "Deleted article successfully!";
  }
}
