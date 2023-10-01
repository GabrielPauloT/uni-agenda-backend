import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecorrenciasService } from './recorrencias.service';
import { CreateRecorrenciaDto } from './dto/create-recorrencia.dto';
import { UpdateRecorrenciaDto } from './dto/update-recorrencia.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('recorrencias')
@ApiTags('recorrencias')
export class RecorrenciasController {
  constructor(private readonly recorrenciasService: RecorrenciasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova recorrência' })
  create(@Body() createRecorrenciaDto: CreateRecorrenciaDto) {
    return this.recorrenciasService.create(createRecorrenciaDto);
  }

  @Get(':page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista todas as recorrências' })
  findAll(@Param('page') page: string, @Param('perPage') perPage: string) {
    return this.recorrenciasService.findAll(+page, +perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma recorrência específica' })
  findOne(@Param('id') id: string) {
    return this.recorrenciasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma recorrência específica' })
  update(
    @Param('id') id: string,
    @Body() updateRecorrenciaDto: UpdateRecorrenciaDto,
  ) {
    return this.recorrenciasService.update(+id, updateRecorrenciaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma recorrência específica' })
  remove(@Param('id') id: string) {
    return this.recorrenciasService.remove(+id);
  }
}
