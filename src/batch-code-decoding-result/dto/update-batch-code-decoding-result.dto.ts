import { PartialType } from '@nestjs/swagger';
import { CreateBatchCodeDecodingResultDto } from './create-batch-code-decoding-result.dto';

export class UpdateBatchCodeDecodingResultDto extends PartialType(CreateBatchCodeDecodingResultDto) {}
