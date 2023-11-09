import { Test, TestingModule } from '@nestjs/testing';
import { HorariosalteradosService } from './horariosalterados.service';

describe('HorariosalteradosService', () => {
  let service: HorariosalteradosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorariosalteradosService],
    }).compile();

    service = module.get<HorariosalteradosService>(HorariosalteradosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
