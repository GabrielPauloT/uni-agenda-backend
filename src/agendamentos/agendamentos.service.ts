import { Injectable } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AgendamentosService {
  constructor(private prisma: PrismaService) {}
  async create(createAgendamentoDto: CreateAgendamentoDto) {
    const {
      DataFinal,
      DataInicio,
      DiaSemana,
      HoraFinal,
      HoraInicial,
      IdSala,
      IdSolicitante,
      IdUsuario,
      Tema,
    } = createAgendamentoDto;
    if ((DiaSemana.length = 0))
      return {
        Message: 'Dia da semana não pode ser igual a zero',
        StatusCode: 400,
      };
    if (
      !IdSala ||
      !IdSolicitante ||
      !IdUsuario ||
      !Tema ||
      !DataFinal ||
      !DataInicio ||
      !HoraFinal ||
      !HoraInicial
    )
      return { Message: 'Campos obrigatórios faltando', StatusCode: 400 };
    if (DataInicio > DataFinal)
      return { Message: 'Data inicial maior que data final', StatusCode: 400 };
    if (HoraInicial > HoraFinal)
      return { Message: 'Hora inicial maior que hora final', StatusCode: 400 };
    const salaData = await this.prisma.sala.findUnique({
      where: { id: IdSala },
    });
    const usuarioData = await this.prisma.usuario.findUnique({
      where: { id: IdUsuario },
    });
    const solicitanteData = await this.prisma.solicitante.findUnique({
      where: { id: IdSolicitante },
    });
    try {
      await this.prisma.agendamento.create({
        data: {
          datainicio: DataInicio,
          datafinal: DataFinal,
          tema: Tema,
          diasemana: DiaSemana,
          horainicial: HoraInicial,
          horafinal: HoraFinal,
          idsala: salaData.id,
          idusuario: usuarioData.id,
          idsolicitante: solicitanteData.id,
        },
      });
      return { Message: 'Agendamento criado com sucesso', StatusCode: 201 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { Message: 'Agendamento já existe', StatusCode: 400 };
        }
      }
      return { Message: err.Message, StatusCode: 500 };
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const agendamentos = await this.prisma.agendamento.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      if (!agendamentos)
        return { Message: 'Nenhum agendamento encontrado', StatusCode: 404 };
      const TotalRecords = await this.prisma.agendamento.count();
      return {
        Result: agendamentos,
        TotalRecords,
        page,
        perPage,
        StatusCode: 200,
      };
    } catch (err) {
      return {
        Message: err.Message,
        StatusCode: 500,
      };
    }
  }

  async findOne(id: number) {
    try {
      const agendamento = await this.prisma.agendamento.findUnique({
        where: { id: id },
      });
      if (!agendamento)
        return { Message: 'Agendamento não encontrado', StatusCode: 404 };
      return { Result: agendamento, StatusCode: 200 };
    } catch (err) {
      return {
        Message: err.Message,
        StatusCode: 500,
      };
    }
  }

  async update(id: number, updateAgendamentoDto: UpdateAgendamentoDto) {
    const salaData = await this.prisma.sala.findUnique({
      where: { id: updateAgendamentoDto.IdSala },
    });
    const usuarioData = await this.prisma.usuario.findUnique({
      where: { id: updateAgendamentoDto.IdUsuario },
    });
    const solicitanteData = await this.prisma.solicitante.findUnique({
      where: { id: updateAgendamentoDto.IdSolicitante },
    });
    try {
      await this.prisma.agendamento.update({
        where: { id: id },
        data: {
          datainicio: updateAgendamentoDto.DataInicio,
          datafinal: updateAgendamentoDto.DataFinal,
          idsala: salaData.id,
          idusuario: usuarioData.id,
          idsolicitante: solicitanteData.id,
        },
      });
      return { Message: 'Agendamento atualizado com sucesso', StatusCode: 200 };
    } catch (err) {
      return {
        Message: err.Message,
        StatusCode: 500,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.agendamento.delete({
        where: { id: id },
      });
      return { Message: 'Agendamento deletado com sucesso', StatusCode: 200 };
    } catch (err) {
      return {
        Message: err.Message,
        StatusCode: 500,
      };
    }
  }
}
