import { Test, TestingModule } from '@nestjs/testing';
import { BatchCodeDecodingResultController } from './batch-code-decoding-result.controller';
import { BatchCodeDecodingResultService } from './batch-code-decoding-result.service';

describe('BatchCodeDecodingResultController', () => {
  let controller: BatchCodeDecodingResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchCodeDecodingResultController],
      providers: [BatchCodeDecodingResultService],
    }).compile();

    controller = module.get<BatchCodeDecodingResultController>(BatchCodeDecodingResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
