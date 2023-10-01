import { PartialType } from '@nestjs/swagger';
import { CreateTipossolicitanteDto } from './create-tipossolicitante.dto';

export class UpdateTipossolicitanteDto extends PartialType(CreateTipossolicitanteDto) {}
