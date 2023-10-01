import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ required: true, description: 'Nome da Sala' })
  @IsString()
  @Length(255)
  public NomeDaSala: string;

  @ApiProperty({ required: true, description: 'Capacidade' })
  @IsInt()
  public Capacidade: number;

  @ApiProperty({ required: true, description: 'Tipo da Sala' })
  @IsInt()
  public IdTipoDaSala: number;
}
