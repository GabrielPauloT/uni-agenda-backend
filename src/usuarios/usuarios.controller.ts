import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('usuarios')
@ApiTags('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get(':page/page/:perPage/per-page')
  @ApiOperation({ summary: 'Lista todos os usuários' })
  findAll(@Param('page') page: string, @Param('perPage') perPage: string) {
    return this.usuariosService.findAll(+page, +perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um usuário específico' })
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário específico' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário específico' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
