import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';

export class CreateFaltaDto {
  @ApiProperty({ name: 'IdAgendamento', required: true })
  @IsInt()
  public IdAgendamento: number;

  @ApiProperty({ name: 'Data', required: true })
  @IsDate()
  public Data: Date;
}
