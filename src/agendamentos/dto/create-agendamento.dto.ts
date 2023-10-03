import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAgendamentoDto {
  @ApiProperty({ description: 'Id da Sala', required: true })
  @IsNumber()
  @IsNotEmpty()
  public IdSala: number;

  @ApiProperty({ description: 'Id do Usuário', required: true })
  @IsNumber()
  @IsNotEmpty()
  public IdUsuario: number;

  @ApiProperty({ description: 'Id do Solicitante', required: true })
  @IsNumber()
  @IsNotEmpty()
  public IdSolicitante: number;

  @ApiProperty({ description: 'Data de Início', required: true })
  @IsNotEmpty()
  public DataInicio: Date;

  @ApiProperty({ description: 'Data de Final', required: true })
  @IsNotEmpty()
  public DataFinal: Date;

  @ApiProperty({ description: 'Tema', required: true })
  @IsNotEmpty()
  @IsString()
  public Tema: string;

  @ApiProperty({ description: 'Dia da Semana', required: true })
  @IsNotEmpty()
  @IsEnum([0, 1, 2, 3, 4, 5, 6])
  public DiaSemana: number[];

  @ApiProperty({ description: 'Hora Inicial', required: true })
  @IsNotEmpty()
  @IsString()
  public HoraInicial: string;

  @ApiProperty({ description: 'Hora Final', required: true })
  @IsNotEmpty()
  @IsString()
  public HoraFinal: string;
}
