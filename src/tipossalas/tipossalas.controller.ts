import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipossalasService } from './tipossalas.service';
import { CreateTipossalaDto } from './dto/create-tipossala.dto';
import { UpdateTipossalaDto } from './dto/update-tipossala.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tipossalas')
@ApiTags('tiposSalas')
export class TipossalasController {
  constructor(private readonly tipossalasService: TipossalasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo tipo de sala' })
  create(@Body() createTipossalaDto: CreateTipossalaDto) {
    return this.tipossalasService.create(createTipossalaDto);
  }

  @Get(':page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista todos os tipos de salas' })
  findAll(@Param('page') page: string, @Param('perPage') perPage: string) {
    return this.tipossalasService.findAll(+page, +perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um tipo de sala específico' })
  findOne(@Param('id') id: string) {
    return this.tipossalasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um tipo de sala específico' })
  update(
    @Param('id') id: string,
    @Body() updateTipossalaDto: UpdateTipossalaDto,
  ) {
    return this.tipossalasService.update(+id, updateTipossalaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um tipo de sala específico' })
  async remove(@Param('id') id: string) {
    return await this.tipossalasService.remove(+id);
  }
}
