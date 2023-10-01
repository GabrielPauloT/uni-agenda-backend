import { PartialType } from '@nestjs/swagger';
import { CreateRecorrenciaDto } from './create-recorrencia.dto';

export class UpdateRecorrenciaDto extends PartialType(CreateRecorrenciaDto) {}
