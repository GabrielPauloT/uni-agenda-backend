import { Test, TestingModule } from '@nestjs/testing';
import { TipossolicitantesController } from './tipossolicitantes.controller';
import { TipossolicitantesService } from './tipossolicitantes.service';

describe('TipossolicitantesController', () => {
  let controller: TipossolicitantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipossolicitantesController],
      providers: [TipossolicitantesService],
    }).compile();

    controller = module.get<TipossolicitantesController>(TipossolicitantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
