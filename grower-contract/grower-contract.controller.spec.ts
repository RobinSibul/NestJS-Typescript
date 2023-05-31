import { Test, TestingModule } from '@nestjs/testing';
import { GrowerContractController } from './grower-contract.controller';

describe('GrowerContractController', () => {
  let controller: GrowerContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrowerContractController],
    }).compile();

    controller = module.get<GrowerContractController>(GrowerContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
