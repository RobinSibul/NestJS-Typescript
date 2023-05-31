import { Test, TestingModule } from '@nestjs/testing';
import { LotEventController } from './lot-event.controller';

describe('LotEvent Controller', () => {
  let controller: LotEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotEventController],
    }).compile();

    controller = module.get<LotEventController>(LotEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
