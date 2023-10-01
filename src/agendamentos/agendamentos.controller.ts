import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentosService.create(createAgendamentoDto);
  }

  @Get()
  findAll() {
    return this.agendamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgendamentoDto: UpdateAgendamentoDto) {
    return this.agendamentosService.update(+id, updateAgendamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamentosService.remove(+id);
  }
}
