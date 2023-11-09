import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class RelatorioFaltaDto {
  @ApiProperty({ name: 'Data inicio', required: true })
  @IsDate()
  public DataInicio: Date;

  @ApiProperty({ name: 'Data fim', required: true })
  @IsDate()
  public DataFim: Date;
}
