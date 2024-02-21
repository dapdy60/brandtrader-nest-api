import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateBatchCodeFormularDto {
    @IsNotEmpty()
    @ApiProperty()
    creationTime: Date;

    @IsString()
    @ApiProperty()
    creatorId: string | null;

    @IsString()
    @ApiProperty()
    manufacturerId: string;

    @IsString()
    @ApiProperty()
    decodeFunctionShortName: string;

    @IsString()
    @ApiProperty()
    decodeFunctionFullName: string;

    @IsString()
    @ApiProperty()
    exampleImageURL: string;

    @IsString()
    @ApiProperty()
    exampleInput: string;

    @IsString()
    @ApiProperty()
    decodeFunctionType: string;
}
