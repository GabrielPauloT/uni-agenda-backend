import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipossolicitantesService } from './tipossolicitantes.service';
import { CreateTipossolicitanteDto } from './dto/create-tipossolicitante.dto';
import { UpdateTipossolicitanteDto } from './dto/update-tipossolicitante.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tipossolicitantes')
@ApiTags('tipossolicitantes')
export class TipossolicitantesController {
  constructor(
    private readonly tipossolicitantesService: TipossolicitantesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo tipo de solicitante' })
  create(@Body() createTipossolicitanteDto: CreateTipossolicitanteDto) {
    return this.tipossolicitantesService.create(createTipossolicitanteDto);
  }

  @Get(':page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista todos os tipos de solicitantes' })
  findAll(@Param('page') page: string, @Param('perPage') perPage: string) {
    return this.tipossolicitantesService.findAll(+page, +perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um tipo de solicitante específico' })
  findOne(@Param('id') id: string) {
    return this.tipossolicitantesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um tipo de solicitante específico' })
  update(
    @Param('id') id: string,
    @Body() updateTipossolicitanteDto: UpdateTipossolicitanteDto,
  ) {
    return this.tipossolicitantesService.update(+id, updateTipossolicitanteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um tipo de solicitante específico' })
  remove(@Param('id') id: string) {
    return this.tipossolicitantesService.remove(+id);
  }
}
