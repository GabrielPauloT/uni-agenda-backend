import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTipossalaDto {
  @ApiProperty({ required: true, description: 'Nome do Tipo da Sala' })
  @IsString()
  @Length(255)
  public Nomedotipo: string;
}
