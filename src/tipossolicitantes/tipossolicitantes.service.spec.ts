import { Test, TestingModule } from '@nestjs/testing';
import { TipossolicitantesService } from './tipossolicitantes.service';

describe('TipossolicitantesService', () => {
  let service: TipossolicitantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipossolicitantesService],
    }).compile();

    service = module.get<TipossolicitantesService>(TipossolicitantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
