import { PartialType } from '@nestjs/swagger';
import { CreateFaltaDto } from './create-falta.dto';

export class UpdateFaltaDto extends PartialType(CreateFaltaDto) {}
