import { PartialType } from '@nestjs/swagger';
import { CreateHorariosalteradoDto } from './create-horariosalterado.dto';

export class UpdateHorariosalteradoDto extends PartialType(
  CreateHorariosalteradoDto,
) {}
