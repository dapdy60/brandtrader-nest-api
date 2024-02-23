import { ApiProperty } from "@nestjs/swagger";

export class  DecodeResult {
  @ApiProperty()
  year?: number;
  @ApiProperty()
  month?: number;
  @ApiProperty()
  day?: number;
  @ApiProperty()
  output: string;
  @ApiProperty()
  usedFallback?: boolean;
  @ApiProperty()
  hasError?: boolean;
  @ApiProperty()
  errorMessage?: string;
  @ApiProperty()
  functionUsed?: string;
}
