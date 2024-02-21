import { UserFeedback } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class UserFeedbackEntity implements UserFeedback {
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
    feedbackType: string;

    @ApiProperty()
    feedbackMessage: string;

    @ApiProperty()
    feedbackSubject: string;

    @ApiProperty()
    feedbackResponse: string;

    @ApiProperty()
    feedbackResponseTime: Date;

    @ApiProperty()
    feedbackResponseUserDetailsId: string;

    @ApiProperty()
    rating: number;

    @ApiProperty()
    isResolved: boolean;

    @ApiProperty()
    resolvedBy: string;

    @ApiProperty()
    resolvedTime: Date;

    @ApiProperty()
    resolvedMessage: string;
}
