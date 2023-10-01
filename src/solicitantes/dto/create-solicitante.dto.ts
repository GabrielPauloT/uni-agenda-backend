import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateSolicitanteDto {
  @ApiProperty({ required: true, description: 'Nome do Solicitante' })
  @IsString()
  @Length(255)
  NomeSolicitante: string;

  @ApiProperty({ required: true, description: 'Email do Solicitante' })
  @IsString()
  @Length(255)
  EmailSolicitante: string;

  @ApiProperty({ required: true, description: 'Id do Tipo do Solicitante' })
  @IsNumber()
  IdTipoSolicitante: number;
}
