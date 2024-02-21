import { PartialType } from '@nestjs/swagger';
import { CreateUserFeedbackDto } from './create-user-feedback.dto';

export class UpdateUserFeedbackDto extends PartialType(CreateUserFeedbackDto) {}
