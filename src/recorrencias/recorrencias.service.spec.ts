import { Test, TestingModule } from '@nestjs/testing';
import { RecorrenciasService } from './recorrencias.service';

describe('RecorrenciasService', () => {
  let service: RecorrenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecorrenciasService],
    }).compile();

    service = module.get<RecorrenciasService>(RecorrenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
