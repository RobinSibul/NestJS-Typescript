import { Test, TestingModule } from '@nestjs/testing';
import { FieldController } from './field.controller';

describe('Field Controller', () => {
  let controller: FieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldController],
    }).compile();

    controller = module.get<FieldController>(FieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
