import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateBrandDto {
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
    manufacturerId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    standardName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    logoUrl: string;
}
