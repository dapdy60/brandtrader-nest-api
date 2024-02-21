import { Test, TestingModule } from '@nestjs/testing';
import { BatchCodeFormularController } from './batch-code-formular.controller';
import { BatchCodeFormularService } from './batch-code-formular.service';

describe('BatchCodeFormularController', () => {
  let controller: BatchCodeFormularController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BatchCodeFormularController],
      providers: [BatchCodeFormularService],
    }).compile();

    controller = module.get<BatchCodeFormularController>(BatchCodeFormularController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
