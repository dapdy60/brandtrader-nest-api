import { BatchCodeDecodingResult } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class BatchCodeDecodingResultEntity implements BatchCodeDecodingResult {
    @ApiProperty()
    id: string;
    @ApiProperty()
    creationTime: Date;
    @ApiProperty()
    creatorId: string | null;
    @ApiProperty()
    lastModificationTime: Date | null;
    @ApiProperty()
    lastModifierId: string | null;
    @ApiProperty()
    isDeleted: boolean;
    @ApiProperty()
    deleterId: string | null;
    @ApiProperty()
    deletionTime: Date | null;
    @ApiProperty()
    inputBatchCode: string;
    @ApiProperty()
    responseDictionaryJson: string;
    @ApiProperty()
    usedSmartLookup: boolean;
    @ApiProperty()
    brandId: string;
    @ApiProperty()
    batchCodeCalculationFormularId: string | null;
    @ApiProperty()
    userDetailsId: string | null;
}
