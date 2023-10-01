import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) {}
  async create(createSalaDto: CreateSalaDto) {
    if (
      !createSalaDto.NomeDaSala ||
      !createSalaDto.Capacidade ||
      !createSalaDto.IdTipoDaSala
    ) {
      if (createSalaDto.Capacidade <= 0) {
        return { message: 'A capacidade deve ser maior que zero', status: 400 };
      }
      return { message: 'Campos obrigatórios faltando', status: 400 };
    }
    const tipoSalaData = await this.prisma.tiposala.findUnique({
      where: { id: createSalaDto.IdTipoDaSala },
    });
    try {
      await this.prisma.sala.create({
        data: {
          nomedasala: createSalaDto.NomeDaSala,
          capacidade: createSalaDto.Capacidade,
          idtiposala: tipoSalaData.id,
        },
      });
      return { message: 'Sala criada com sucesso', status: 201 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Nome da sala já existe', status: 400 };
        }
        return { message: 'Ocorreu um erro ao criar a sala', status: 500 };
      }
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const salas = await this.prisma.sala.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const total = await this.prisma.sala.count();
      if (!salas) return { message: 'Nenhuma sala encontrada', status: 404 };
      return { salas, total, page, perPage, status: 200 };
    } catch (err) {
      return { message: 'Ocorreu um erro ao listar as salas', status: 500 };
    }
  }

  async findOne(id: number) {
    try {
      const sala = await this.prisma.sala.findUnique({
        where: { id: id },
      });
      return { sala, status: 200 };
    } catch (err) {
      return { message: 'Sala não encontrada', status: 404 };
    }
  }

  async findAllByTipoSala(name: string, page: number, perPage: number) {
    try {
      const salas = await this.prisma.sala.findMany({
        where: {
          tiposala: {
            nomedotipo: name,
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const total = await this.prisma.sala.count({
        where: {
          tiposala: {
            nomedotipo: name,
          },
        },
      });
      if (!salas)
        return {
          message: 'Nenhuma sala com esse nome encontrado',
          status: 404,
        };
      return { salas, total, page, perPage, status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao listar as salas por nome',
        status: 500,
      };
    }
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    if (updateSalaDto.Capacidade <= 0) {
      return { message: 'A capacidade deve ser maior que zero', status: 400 };
    }
    const tipoSalaData = await this.prisma.tiposala.findUnique({
      where: { id: updateSalaDto.IdTipoDaSala },
    });
    try {
      await this.prisma.sala.update({
        where: { id: id },
        data: {
          nomedasala: updateSalaDto.NomeDaSala,
          capacidade: updateSalaDto.Capacidade,
          idtiposala: tipoSalaData.id,
        },
      });
      return { message: 'Sala atualizada com sucesso', status: 200 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Nome da sala já existe', status: 400 };
        }
        return { message: 'Ocorreu um erro ao atualizar a sala', status: 500 };
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.sala.delete({
        where: { id },
      });
      return { message: 'Sala deletada com sucesso', status: 200 };
    } catch (err) {
      return { message: 'Ocorreu um erro ao deletar a sala', status: 500 };
    }
  }
}
