import { Test, TestingModule } from '@nestjs/testing';
import { SlidingScaleController } from './slidingScale.controller';

describe('SlidingScale Controller', () => {
  let controller: SlidingScaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlidingScaleController],
    }).compile();

    controller = module.get<SlidingScaleController>(SlidingScaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
