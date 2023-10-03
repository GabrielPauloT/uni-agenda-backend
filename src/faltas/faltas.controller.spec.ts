import { Test, TestingModule } from '@nestjs/testing';
import { FaltasController } from './faltas.controller';
import { FaltasService } from './faltas.service';

describe('FaltasController', () => {
  let controller: FaltasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaltasController],
      providers: [FaltasService],
    }).compile();

    controller = module.get<FaltasController>(FaltasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
