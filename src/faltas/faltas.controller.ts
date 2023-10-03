import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FaltasService } from './faltas.service';
import { CreateFaltaDto } from './dto/create-falta.dto';
import { UpdateFaltaDto } from './dto/update-falta.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('faltas')
@ApiTags('faltas')
export class FaltasController {
  constructor(private readonly faltasService: FaltasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova falta' })
  create(@Body() createFaltaDto: CreateFaltaDto) {
    return this.faltasService.create(createFaltaDto);
  }

  @Get(':page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista todas as faltas' })
  findAll(@Param('page') page: string, @Param('perPage') perPage: string) {
    return this.faltasService.findAll(+page, +perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma falta específica' })
  findOne(@Param('id') id: string) {
    return this.faltasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma falta específica' })
  update(@Param('id') id: string, @Body() updateFaltaDto: UpdateFaltaDto) {
    return this.faltasService.update(+id, updateFaltaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma falta específica' })
  remove(@Param('id') id: string) {
    return this.faltasService.remove(+id);
  }
}
