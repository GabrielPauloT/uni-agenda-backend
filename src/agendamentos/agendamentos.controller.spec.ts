import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

describe('AgendamentosController', () => {
  let controller: AgendamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamentosController],
      providers: [AgendamentosService],
    }).compile();

    controller = module.get<AgendamentosController>(AgendamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
