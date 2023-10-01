import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateRecorrenciaDto {
  @ApiProperty({ description: 'ID do Agendamento', required: true })
  @IsOptional()
  public IdAgendamento: number;

  @ApiProperty({ description: 'Dia da Semana', required: true })
  @IsInt()
  @IsOptional()
  public DiaSemana: number;

  @ApiProperty({ description: 'Hora Inicial', required: true })
  @IsDateString()
  @IsOptional()
  public HoraInicial: string;

  @ApiProperty({ description: 'Hora Final', required: true })
  @IsDateString()
  @IsOptional()
  public HoraFinal: string;

  @ApiProperty({ description: 'Data', required: true })
  @IsDateString()
  @IsOptional()
  public Data: string;

  @ApiProperty({ description: 'Presença', required: true })
  @IsBoolean()
  @IsOptional()
  public Presenca: boolean;
}
