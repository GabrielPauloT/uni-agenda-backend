import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SolicitantesService } from './solicitantes.service';
import { CreateSolicitanteDto } from './dto/create-solicitante.dto';
import { UpdateSolicitanteDto } from './dto/update-solicitante.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('solicitantes')
@ApiTags('solicitantes')
export class SolicitantesController {
  constructor(private readonly solicitantesService: SolicitantesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo solicitante' })
  create(@Body() createSolicitanteDto: CreateSolicitanteDto) {
    return this.solicitantesService.create(createSolicitanteDto);
  }

  @Get(':page/page/:perPage/per-page/nome-solicitante/:nome?/')
  @ApiOperation({ summary: 'Lista todos os solicitantes' })
  findAll(
    @Param('page') page: string,
    @Param('perPage') perPage: string,
    @Param('nome') nome: string,
  ) {
    return this.solicitantesService.findAll(+page, +perPage, nome);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um solicitante específico' })
  findOne(@Param('id') id: string) {
    return this.solicitantesService.findOne(+id);
  }

  @Get(':nome/nome-solicitante/:page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista solicitantes por nome do solicitante' })
  findAllByNomeSolicitante(
    @Param('nome') nome: string,
    @Param('page') page: string,
    @Param('perPage') perPage: string,
  ) {
    return this.solicitantesService.findAllByNomeSolicitante(
      nome,
      +page,
      +perPage,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um solicitante específico' })
  update(
    @Param('id') id: string,
    @Body() updateSolicitanteDto: UpdateSolicitanteDto,
  ) {
    return this.solicitantesService.update(+id, updateSolicitanteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um solicitante específico' })
  remove(@Param('id') id: string) {
    return this.solicitantesService.remove(+id);
  }
}
