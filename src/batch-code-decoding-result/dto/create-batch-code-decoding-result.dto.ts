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
    @ApiProperty()
    responseDictionaryJson: string;

    @IsBoolean()
    @ApiProperty()
    usedSmartLookup: boolean;

    @IsString()
    @ApiProperty()
    brandId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    brandName: string;

    @IsString()
    @ApiProperty()
    batchCodeCalculationFormularId: string;

    @IsString()
    @ApiProperty()
    productType: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userDetailsId: string;
    
}
