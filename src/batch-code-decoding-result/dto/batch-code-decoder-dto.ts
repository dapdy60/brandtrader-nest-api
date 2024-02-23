import { ApiProperty } from "@nestjs/swagger";

export class BatchCodeDecoderDto {
    @ApiProperty({ type: 'string', format: 'form' })
    batchCode: string;
  
    @ApiProperty({ type: 'string' })
    brand: string;
  
    @ApiProperty({ type: 'string', format: 'form' })
    brandId: string;
  
    @ApiProperty({ type: 'string', format: 'form' })
    productType: string;
}