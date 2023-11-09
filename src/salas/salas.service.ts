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
        return {
          Message: 'A capacidade deve ser maior que zero',
          StatusCode: 422,
        };
      }
      return { Message: 'Campos obrigatórios faltando', StatusCode: 400 };
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
      return { Message: 'Sala criada com sucesso', StatusCode: 201 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { Message: 'Nome da sala já existe', StatusCode: 400 };
        }
      }
      return { Message: err.message, StatusCode: 500 };
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const salas = await this.prisma.sala.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
          tiposala: true,
        },
      });

      if (!salas)
        return { Message: 'Nenhuma sala encontrada', StatusCode: 404 };

      const TotalRecords = await this.prisma.sala.count();

      return {
        Result: salas.map((sala) => ({
          id: sala.id,
          tipo: sala.tiposala,
          nome: sala.nomedasala,
          capacidade: sala.capacidade,
          CriadoEm: sala.createdat,
          AtualizadoEm: sala.updatedat,
        })),
        TotalRecords,
        page,
        perPage,
        StatusCode: 200,
      };
    } catch (err) {
      return { Message: err.message, StatusCode: 500 };
    }
  }

  async findOne(id: number) {
    try {
      const sala = await this.prisma.sala.findUnique({
        where: { id: id },
      });
      if (!sala) return { Message: 'Nenhuma sala encontrada', StatusCode: 404 };
      return { Result: sala, StatusCode: 200 };
    } catch (err) {
      return { Message: err.message, StatusCode: 500 };
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
      if (!salas)
        return {
          Message: 'Nenhuma sala com esse nome encontrado',
          StatusCode: 404,
        };
      const TotalRecords = await this.prisma.sala.count({
        where: {
          tiposala: {
            nomedotipo: name,
          },
        },
      });
      return { Result: salas, TotalRecords, page, perPage, StatusCode: 200 };
    } catch (err) {
      return {
        Message: err.message,
        StatusCode: 500,
      };
    }
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    if (updateSalaDto.Capacidade <= 0) {
      return {
        Message: 'A capacidade deve ser maior que zero',
        StatusCode: 400,
      };
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
      return { Message: 'Sala atualizada com sucesso', StatusCode: 200 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { Message: 'Nome da sala já existe', StatusCode: 400 };
        }
      }
      return {
        Message: err.message,
        StatusCode: 500,
      };
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.sala.delete({
        where: { id },
      });
      return { Message: 'Sala deletada com sucesso', StatusCode: 200 };
    } catch (err) {
      return { Message: err.message, StatusCode: 500 };
    }
  }
}
