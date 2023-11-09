import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHorariosalteradoDto {
  @ApiProperty({ description: 'Id do HorarioAlterado', required: true })
  @IsNumber()
  @IsNotEmpty()
  public IdHorarioAlterado: number;

  @ApiProperty({ description: 'Id do agendamento', required: true })
  @IsNumber()
  @IsNotEmpty()
  public IdAgendamento: number;

  @ApiProperty({ description: 'hora inicial', required: true })
  @IsDate()
  @IsNotEmpty()
  public data: Date;

  @ApiProperty({ description: 'hora inicial', required: true })
  @IsString()
  @IsNotEmpty()
  public horainicial: string;

  @ApiProperty({ description: 'hora final', required: true })
  @IsString()
  @IsNotEmpty()
  public horafinal: string;
}
