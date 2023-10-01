import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsString()
  public Nome: string;

  @IsOptional()
  @IsString()
  public Email: string;

  @IsOptional()
  @IsString()
  public Senha: string;
}
