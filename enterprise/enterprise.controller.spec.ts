import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseController } from './enterprise.controller';

describe('Enterprise Controller', () => {
  let controller: EnterpriseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterpriseController],
    }).compile();

    controller = module.get<EnterpriseController>(EnterpriseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
