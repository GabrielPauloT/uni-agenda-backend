import { PartialType } from '@nestjs/swagger';
import { CreateTipossalaDto } from './create-tipossala.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTipossalaDto extends PartialType(CreateTipossalaDto) {
  @IsOptional()
  @IsString()
  public Nomedotipo: string;
}
