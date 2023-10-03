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
        message: 'Dia da semana não pode ser igual a zero',
        status: 400,
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
      return { message: 'Campos obrigatórios faltando', status: 400 };
    if (DataInicio > DataFinal)
      return { message: 'Data inicial maior que data final', status: 400 };
    if (HoraInicial > HoraFinal)
      return { message: 'Hora inicial maior que hora final', status: 400 };
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
      return { message: 'Agendamento criado com sucesso', status: 201 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Agendamento já existe', status: 400 };
        }
      }
      return { message: err.message, status: 500 };
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const agendamentos = await this.prisma.agendamento.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      if (!agendamentos)
        return { message: 'Nenhum agendamento encontrado', status: 404 };
      const total = await this.prisma.agendamento.count();
      return { agendamentos, total, page, perPage, status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao listar os agendamentos',
        status: 500,
      };
    }
  }

  async findOne(id: number) {
    try {
      const agendamento = await this.prisma.agendamento.findUnique({
        where: { id: id },
      });
      if (!agendamento)
        return { message: 'Agendamento não encontrado', status: 404 };
      return { agendamento, status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao listar o agendamento',
        status: 500,
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
      return { message: 'Agendamento atualizado com sucesso', status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao atualizar o agendamento',
        status: 500,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.agendamento.delete({
        where: { id: id },
      });
      return { message: 'Agendamento deletado com sucesso', status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao deletar o agendamento',
        status: 500,
      };
    }
  }
}
