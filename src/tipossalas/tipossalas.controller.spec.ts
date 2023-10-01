import { Test, TestingModule } from '@nestjs/testing';
import { TipossalasController } from './tipossalas.controller';
import { TipossalasService } from './tipossalas.service';

describe('TipossalasController', () => {
  let controller: TipossalasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipossalasController],
      providers: [TipossalasService],
    }).compile();

    controller = module.get<TipossalasController>(TipossalasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
