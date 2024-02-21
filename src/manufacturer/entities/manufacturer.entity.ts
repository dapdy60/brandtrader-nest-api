import { ApiProperty } from "@nestjs/swagger";
import { Manufacturer } from "@prisma/client";

export class ManufacturerEntity implements  Manufacturer {
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
    name: string;
    @ApiProperty()
    logoUrl: string;
    @ApiProperty()
    description: string;
}
