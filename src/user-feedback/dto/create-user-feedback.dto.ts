import { UserFeedback } from "@prisma/client";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserFeedbackDto {
    @ApiProperty()
    @IsNotEmpty()
    creationTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    creatorId: string;

    @ApiProperty()
    @IsNotEmpty()
    lastModificationTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    lastModifierId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDeleted: boolean;

    @ApiProperty()
    @IsOptional()
    deleterId: string;

    @ApiProperty()
    @IsOptional()
    deletionTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    feedbackType: string;

    @ApiProperty()
    @IsNotEmpty()
    feedbackMessage: string;

    @ApiProperty()
    @IsNotEmpty()
    feedbackSubject: string;

    @ApiProperty()
    @IsOptional()
    feedbackResponse: string;

    @ApiProperty()
    @IsOptional()
    feedbackResponseTime: Date;

    @ApiProperty()
    @IsOptional()
    feedbackResponseUserDetailsId: string;

    @ApiProperty()
    @IsNotEmpty()
    rating: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isResolved: boolean;

    @ApiProperty()
    @IsOptional()
    resolvedBy: string;

    @ApiProperty()
    @IsOptional()
    resolvedTime: Date;

    @ApiProperty()
    @IsOptional()
    resolvedMessage: string;
}
