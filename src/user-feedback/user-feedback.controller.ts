import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFeedbackService } from './user-feedback.service';
import { CreateUserFeedbackDto } from './dto/create-user-feedback.dto';
import { UpdateUserFeedbackDto } from './dto/update-user-feedback.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserFeedbackEntity } from './entities/user-feedback.entity';

@Controller('user-feedback')
@ApiTags('User Feedback')
export class UserFeedbackController {
  constructor(private readonly userFeedbackService: UserFeedbackService) {}

  @Post()
  @ApiCreatedResponse({ type: UserFeedbackEntity })
  create(@Body() createUserFeedbackDto: CreateUserFeedbackDto) {
    return this.userFeedbackService.create(createUserFeedbackDto);
  }

  @Get()
  @ApiOkResponse({ type: UserFeedbackEntity, isArray: true })
  findAll() {
    return this.userFeedbackService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserFeedbackEntity })
  findOne(@Param('id') id: string) {
    return this.userFeedbackService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserFeedbackEntity })
  update(@Param('id') id: string, @Body() updateUserFeedbackDto: UpdateUserFeedbackDto) {
    return this.userFeedbackService.update(id, updateUserFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFeedbackService.remove(id);
  }
}
