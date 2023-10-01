import { Injectable } from '@nestjs/common';
import { CreateRecorrenciaDto } from './dto/create-recorrencia.dto';
import { UpdateRecorrenciaDto } from './dto/update-recorrencia.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecorrenciasService {
  constructor(private prisma: PrismaService) {}
  async create(createRecorrenciaDto: CreateRecorrenciaDto) {
    if (
      !createRecorrenciaDto.Data ||
      !createRecorrenciaDto.HoraInicial ||
      !createRecorrenciaDto.HoraFinal ||
      !createRecorrenciaDto.DiaSemana ||
      !createRecorrenciaDto.IdAgendamento
    ) {
      return { message: 'Campos obrigatórios faltando', status: 400 };
    }
    const agendamentoData = await this.prisma.agendamento.findUnique({
      where: { id: createRecorrenciaDto.IdAgendamento },
    });
    try {
      await this.prisma.recorrencia.create({
        data: {
          data: createRecorrenciaDto.Data,
          horainicial: createRecorrenciaDto.HoraInicial,
          horafinal: createRecorrenciaDto.HoraFinal,
          diasemana: createRecorrenciaDto.DiaSemana,
          idagendamento: agendamentoData.id,
        },
      });
      return { message: 'Recorrência criada com sucesso', status: 201 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Recorrência já existe', status: 400 };
        }
      }
      return {
        messageErr: err.message.split('where')[1],
        status: 500,
      };
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const recorrencias = await this.prisma.recorrencia.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const total = await this.prisma.recorrencia.count();
      if (!recorrencias)
        return { message: 'Nenhuma recorrência encontrada', status: 404 };
      return { recorrencias, total, page, perPage, status: 200 };
    } catch (err) {
      return {
        messageErr: err.message.split('where')[1],
        status: 500,
      };
    }
  }

  async findOne(id: number) {
    try {
      const recorrencia = await this.prisma.recorrencia.findUnique({
        where: { id: id },
      });
      if (!recorrencia)
        return { message: 'Recorrência não encontrada', status: 404 };
      return { recorrencia, status: 200 };
    } catch (err) {
      return {
        messageErr: err.message.split('where')[1],
        status: 404,
      };
    }
  }

  update(id: number, updateRecorrenciaDto: UpdateRecorrenciaDto) {
    try {
      this.prisma.recorrencia.update({
        where: { id: id },
        data: {
          data: updateRecorrenciaDto.Data,
          horainicial: updateRecorrenciaDto.HoraInicial,
          horafinal: updateRecorrenciaDto.HoraFinal,
          diasemana: updateRecorrenciaDto.DiaSemana,
          presenca: updateRecorrenciaDto.Presenca,
        },
      });
      return { message: 'Recorrência atualizada com sucesso', status: 200 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2016') {
          return {
            message: 'Recorrência não encontrada',
            status: 404,
          };
        }
        if (err.code === 'P2025') {
          return {
            message: 'Data inválida',
            status: 400,
          };
        }
        if (err.code === 'P2026') {
          return {
            message: 'Hora inicial inválida',
            status: 400,
          };
        }
        if (err.code === 'P2027') {
          return {
            message: 'Hora final inválida',
            status: 400,
          };
        }
      }
      return {
        messageErr: err.message.split('where')[1],
        status: 404,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.recorrencia.delete({
        where: { id: id },
      });
      if (!id) return { message: 'Recorrência não encontrada', status: 404 };
      return { message: 'Recorrência deletada com sucesso', status: 200 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2016') {
          return {
            message: 'Recorrência não encontrada',
            status: 404,
          };
        }
      }
      return {
        messageErr: err.message.split('where')[1],
        status: 404,
      };
    }
  }
}
