import { Test, TestingModule } from '@nestjs/testing';
import { HorariosalteradosController } from './horariosalterados.controller';
import { HorariosalteradosService } from './horariosalterados.service';

describe('HorariosalteradosController', () => {
  let controller: HorariosalteradosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorariosalteradosController],
      providers: [HorariosalteradosService],
    }).compile();

    controller = module.get<HorariosalteradosController>(
      HorariosalteradosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
