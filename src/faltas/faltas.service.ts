import { Injectable } from '@nestjs/common';
import { CreateFaltaDto } from './dto/create-falta.dto';
import { UpdateFaltaDto } from './dto/update-falta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FaltasService {
  constructor(private prisma: PrismaService) {}
  async create(createFaltaDto: CreateFaltaDto) {
    try {
      const { Data, IdAgendamento } = createFaltaDto;
      if (!Data || !IdAgendamento)
        return { message: 'Campos obrigatórios faltando', status: 400 };
      const agendamentoData = await this.prisma.agendamento.findUnique({
        where: { id: IdAgendamento },
      });
      if (!agendamentoData)
        return { message: 'Agendamento não encontrado', status: 404 };
      await this.prisma.falta.create({
        data: {
          data: Data,
          idagendamento: agendamentoData.id,
        },
      });
      return {
        message: `Falta criada com sucesso`,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Falta já existe', status: 400 };
        }
      }
      return {
        message: 'Ocorreu um erro ao criar a falta',
        status: 500,
      };
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const faltas = await this.prisma.falta.findMany();
      if (!faltas) return { message: 'Nenhuma falta encontrada', status: 404 };
      const total = await this.prisma.falta.count();
      return { faltas, total, page, perPage, status: 200 };
    } catch (err) {
      return { message: 'Ocorreu um erro ao listar as faltas', status: 500 };
    }
  }

  async findOne(id: number) {
    try {
      const falta = await this.prisma.falta.findUnique({
        where: { id: id },
      });
      if (!falta) return { message: 'Falta não encontrada', status: 404 };
      return { falta, status: 200 };
    } catch (err) {
      return { message: 'Ocorreu um erro ao listar a falta', status: 500 };
    }
  }

  async update(id: number, updateFaltaDto: UpdateFaltaDto) {
    const agendamentoData = await this.prisma.agendamento.findUnique({
      where: { id: updateFaltaDto.IdAgendamento },
    });
    try {
      await this.prisma.falta.update({
        where: { id: id },
        data: {
          data: updateFaltaDto.Data,
          idagendamento: agendamentoData.id,
        },
      });
      return { message: 'Falta atualizada com sucesso', status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao atualizar a falta',
        status: 500,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.falta.delete({
        where: { id: id },
      });
      return { message: 'Falta deletada com sucesso', status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao deletar a falta',
        status: 500,
      };
    }
  }
}
