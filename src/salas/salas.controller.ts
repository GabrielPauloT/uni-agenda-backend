import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('salas')
@ApiTags('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova sala' })
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salasService.create(createSalaDto);
  }

  @Get(':page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista todas as salas' })
  findAll(@Param('page') page: string, @Param('perPage') perPage: string) {
    return this.salasService.findAll(+page, +perPage);
  }

  @Get(':id/id-sala')
  @ApiOperation({ summary: 'Lista uma sala específica por id sala' })
  findOne(@Param('id') id: string) {
    return this.salasService.findOne(+id);
  }

  @Get(':nome/nome-sala/:page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista salas por nome do tipo da sala' })
  findAllByTipoSala(
    @Param('nome') nome: string,
    @Param('page') page: string,
    @Param('perPage') perPage: string,
  ) {
    return this.salasService.findAllByTipoSala(nome, +page, +perPage);
  }

  @Patch(':id/id-sala')
  @ApiOperation({ summary: 'Atualiza uma sala específica' })
  update(@Param('id') id: string, @Body() updateSalaDto: UpdateSalaDto) {
    return this.salasService.update(+id, updateSalaDto);
  }

  @Delete(':id/id-sala')
  @ApiOperation({ summary: 'Deleta uma sala específica' })
  remove(@Param('id') id: string) {
    return this.salasService.remove(+id);
  }
}
