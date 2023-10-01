import { PartialType } from '@nestjs/swagger';
import { CreateAgendamentoDto } from './create-agendamento.dto';

export class UpdateAgendamentoDto extends PartialType(CreateAgendamentoDto) {}
