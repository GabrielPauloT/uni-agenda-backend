import { Test, TestingModule } from '@nestjs/testing';
import { RecorrenciasController } from './recorrencias.controller';
import { RecorrenciasService } from './recorrencias.service';

describe('RecorrenciasController', () => {
  let controller: RecorrenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecorrenciasController],
      providers: [RecorrenciasService],
    }).compile();

    controller = module.get<RecorrenciasController>(RecorrenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
