import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateManufacturerDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    creationTime: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    creatorId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastModificationTime: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastModifierId: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    isDeleted: boolean;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    deleterId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    deletionTime: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    logoUrl: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;
}
