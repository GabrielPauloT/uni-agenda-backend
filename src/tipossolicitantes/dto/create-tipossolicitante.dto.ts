import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTipossolicitanteDto {
  @ApiProperty({ required: true, description: 'Nome do tipo da sala' })
  @IsString()
  @Length(255)
  NomeDoTipo: string;
}
