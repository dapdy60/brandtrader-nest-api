import { Test, TestingModule } from '@nestjs/testing';
import { BatchCodeFormularService } from './batch-code-formular.service';

describe('BatchCodeFormularService', () => {
  let service: BatchCodeFormularService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchCodeFormularService],
    }).compile();

    service = module.get<BatchCodeFormularService>(BatchCodeFormularService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
