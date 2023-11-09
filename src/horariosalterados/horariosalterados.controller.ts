import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { HorariosalteradosService } from './horariosalterados.service';
import { CreateHorariosalteradoDto } from './dto/create-horariosalterado.dto';
// import { UpdateHorariosalteradoDto } from './dto/update-horariosalterado.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('horariosalterados')
@ApiTags('horariosalterados')
export class HorariosalteradosController {
  constructor(
    private readonly horariosalteradosService: HorariosalteradosService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria ou atualiza um horariosAlterados' })
  upsert(@Body() createHorariosalteradoDto: CreateHorariosalteradoDto) {
    return this.horariosalteradosService.upsert(createHorariosalteradoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os horariosAlterados' })
  findAll() {
    return this.horariosalteradosService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Buscar um horarioAlterado por ID' })
  // findOne(@Param('id') id: string) {
  //   return this.horariosalteradosService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Atualizar um horarioAlterado' })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateHorariosalteradoDto: UpdateHorariosalteradoDto,
  // ) {
  //   return this.horariosalteradosService.update(+id, updateHorariosalteradoDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Deletar um horarioAlterado' })
  // remove(@Param('id') id: string) {
  //   return this.horariosalteradosService.remove(+id);
  // }
}
