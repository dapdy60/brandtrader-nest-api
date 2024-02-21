import { ApiProperty } from '@nestjs/swagger';
import { BatchCodeFormular, Brand, UserDetails } from '@prisma/client';

export class BatchCodeDecodingResult {
    @ApiProperty()
    id: string;

    @ApiProperty()
    creationTime: Date;

    @ApiProperty()
    creatorId: string;

    @ApiProperty()
    lastModificationTime: Date;

    @ApiProperty()
    lastModifierId: string;

    @ApiProperty()
    isDeleted: boolean;

    @ApiProperty()
    deleterId: string;

    @ApiProperty()
    deletionTime: Date;

    @ApiProperty()
    inputBatchCode: string;

    @ApiProperty()
    responseDictionaryJson: string;

    @ApiProperty()
    usedSmartLookup: boolean;

    @ApiProperty()
    brand: Brand;

    @ApiProperty()
    brandId: string;

    @ApiProperty()
    batchCodeCalculationFormular: BatchCodeFormular;

    @ApiProperty()
    batchCodeCalculationFormularId: string;

    @ApiProperty()
    userDetails: UserDetails;

    @ApiProperty()
    userDetailsId: string;
}
