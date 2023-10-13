import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('agendamentos')
@ApiTags('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo agendamento' })
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentosService.create(createAgendamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os agendamentos' })
  findAll() {
    return this.agendamentosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um agendamento específico' })
  findOne(@Param('id') id: string) {
    return this.agendamentosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um agendamento específico' })
  update(
    @Param('id') id: string,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
  ) {
    return this.agendamentosService.update(+id, updateAgendamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um agendamento específico' })
  remove(@Param('id') id: string) {
    return this.agendamentosService.remove(+id);
  }
}
