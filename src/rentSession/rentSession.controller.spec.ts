import { Test, TestingModule } from '@nestjs/testing';
import { RentSessionController } from './rentSession.controller';

describe('RentSessionController', () => {
  let controller: RentSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentSessionController],
    }).compile();

    controller = module.get<RentSessionController>(RentSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
