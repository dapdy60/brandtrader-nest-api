import { PartialType } from '@nestjs/swagger';
import { CreateBatchCodeFormularDto } from './create-batch-code-formular.dto';

export class UpdateBatchCodeFormularDto extends PartialType(CreateBatchCodeFormularDto) {}
