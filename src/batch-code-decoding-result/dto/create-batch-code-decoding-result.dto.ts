//src/batch-code-decoding-result/dto/create-batch-code-decoding-result.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateBatchCodeDecodingResultDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    inputBatchCode: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    responseDictionaryJson: string;

    @IsBoolean()
    @ApiProperty()
    usedSmartLookup: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    brandId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    batchCodeCalculationFormularId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userDetailsId: string;
}
