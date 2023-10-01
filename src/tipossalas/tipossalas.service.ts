import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipossalaDto } from './dto/create-tipossala.dto';
import { UpdateTipossalaDto } from './dto/update-tipossala.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TipossalasService {
  constructor(private prisma: PrismaService) {}
  async create(createTipossalaDto: CreateTipossalaDto) {
    try {
      const { Nomedotipo } = createTipossalaDto;
      await this.prisma.tiposala.create({
        data: {
          nomedotipo: Nomedotipo,
        },
      });
      if (!Nomedotipo)
        throw new NotFoundException('Tipo de sala não pode ser vazio');
      return {
        message: `Tipo de sala com nome:${Nomedotipo} criado com sucesso`,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Nome do tipo de sala já existe', status: 400 };
        }
        return {
          message: 'Ocorreu um erro ao criar o tipo de sala',
          status: 500,
        };
      }
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const tiposSalas = await this.prisma.tiposala.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const total = await this.prisma.tiposala.count();
      if (!tiposSalas)
        return { message: 'Nenhum tipo de sala encontrado', status: 404 };
      return { tiposSalas, total, page, perPage, status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao listar os tipos de salas',
        status: 500,
      };
    }
  }

  async findOne(id: number) {
    try {
      const tipoSala = await this.prisma.tiposala.findUnique({
        where: { id: id },
      });
      if (!tipoSala)
        return {
          message: `Tipo de sala com id:${id} não encontrado`,
          status: 404,
        };
      return { tipoSala, status: 200 };
    } catch (err) {
      return {
        message: `Ocorreu um erro ao listar o tipo de sala com id:${id}`,
        status: 500,
      };
    }
  }

  async update(id: number, updateTipossalaDto: UpdateTipossalaDto) {
    try {
      const { Nomedotipo } = updateTipossalaDto;
      await this.prisma.tiposala.update({
        where: { id: id },
        data: {
          nomedotipo: Nomedotipo,
          updatedat: new Date(),
        },
      });
      if (!Nomedotipo)
        throw new NotFoundException(`Tipo de sala com id:${id} não encontrado`);
      return { message: `Tipo de sala com id:${id} atualizado com sucesso` };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Nome do tipo de sala já existe', status: 400 };
        }
        return {
          message: 'Ocorreu um erro ao atualizar o tipo de sala',
          status: 500,
        };
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.tiposala.delete({
        where: { id: id },
      });
      return {
        message: `Tipo de sala com id:${id} deletado com sucesso`,
        status: 200,
      };
    } catch (err) {
      return {
        message: `Ocorreu um erro ao deletar o tipo de sala com id:${id}`,
        status: 500,
      };
    }
  }
}
