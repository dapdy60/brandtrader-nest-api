import { Test, TestingModule } from '@nestjs/testing';
import { BatchCodeDecodingResultService } from './batch-code-decoding-result.service';

describe('BatchCodeDecodingResultService', () => {
  let service: BatchCodeDecodingResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchCodeDecodingResultService],
    }).compile();

    service = module.get<BatchCodeDecodingResultService>(BatchCodeDecodingResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
