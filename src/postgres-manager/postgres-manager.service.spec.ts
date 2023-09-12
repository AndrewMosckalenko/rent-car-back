import { Test, TestingModule } from '@nestjs/testing';
import { PostgresManagerService } from './postgres-manager.service';

describe('PostgresManagerService', () => {
  let service: PostgresManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresManagerService],
    }).compile();

    service = module.get<PostgresManagerService>(PostgresManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
