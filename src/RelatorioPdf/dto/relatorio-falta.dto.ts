import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class RelatorioFaltaDto {
  @ApiProperty({ name: 'Data do Periodo', required: true })
  @IsDate()
  public Periodo: Date;
}
