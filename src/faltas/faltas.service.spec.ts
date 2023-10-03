import { Test, TestingModule } from '@nestjs/testing';
import { FaltasService } from './faltas.service';

describe('FaltasService', () => {
  let service: FaltasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaltasService],
    }).compile();

    service = module.get<FaltasService>(FaltasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
