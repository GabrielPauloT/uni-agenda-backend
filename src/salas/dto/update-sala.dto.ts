import { PartialType } from '@nestjs/swagger';
import { CreateSalaDto } from './create-sala.dto';
import { IsOptional, IsString } from 'class-validator';
import { Tipossala } from 'src/tipossalas/entities/tipossala.entity';

export class UpdateSalaDto extends PartialType(CreateSalaDto) {
  @IsOptional()
  @IsString()
  public NomeDaSala: string;

  @IsOptional()
  @IsString()
  public Capacidade: number;

  @IsOptional()
  public TipoDaSala: Tipossala;
}
