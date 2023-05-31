import { Test, TestingModule } from '@nestjs/testing';
import { ProductionAuthorizationController } from './production-authorization.controller';

describe('ProductionAuthorizationController', () => {
  let controller: ProductionAuthorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionAuthorizationController],
    }).compile();

    controller = module.get<ProductionAuthorizationController>(ProductionAuthorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
