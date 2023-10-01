import { PartialType } from '@nestjs/swagger';
import { CreateSolicitanteDto } from './create-solicitante.dto';
import { IsOptional, IsString } from 'class-validator';
import { Tipossolicitante } from 'src/tipossolicitantes/entities/tipossolicitante.entity';

export class UpdateSolicitanteDto extends PartialType(CreateSolicitanteDto) {
  @IsOptional()
  @IsString()
  public NomeSolicitante: string;

  @IsOptional()
  @IsString()
  public EmailSolicitante: string;

  @IsOptional()
  public TipoSolicitante: Tipossolicitante;
}
