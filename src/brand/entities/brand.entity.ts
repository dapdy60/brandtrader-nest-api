import { Brand } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class BrandEntity implements Brand {
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
  manufacturerId: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  standardName: string;

  @ApiProperty()
  logoUrl: string;
}
