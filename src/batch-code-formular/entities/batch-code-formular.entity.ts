import { BatchCodeFormular } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class BatchCodeFormularEntity implements BatchCodeFormular {
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
    manufacturerId: string;

    @ApiProperty()
    decodeFunctionShortName: string;

    @ApiProperty()
    decodeFunctionFullName: string;

    @ApiProperty()
    exampleImageURL: string;

    @ApiProperty()
    exampleInput: string;

    @ApiProperty()
    decodeFunctionType: string;
}
