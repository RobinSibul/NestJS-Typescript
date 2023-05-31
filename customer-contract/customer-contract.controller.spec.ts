import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContractController } from './customer-contract.controller';

describe('CustomerContractController', () => {
  let controller: CustomerContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerContractController],
    }).compile();

    controller = module.get<CustomerContractController>(CustomerContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
