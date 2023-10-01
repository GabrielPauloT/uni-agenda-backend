import { Test, TestingModule } from '@nestjs/testing';
import { TipossalasService } from './tipossalas.service';

describe('TipossalasService', () => {
  let service: TipossalasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipossalasService],
    }).compile();

    service = module.get<TipossalasService>(TipossalasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
