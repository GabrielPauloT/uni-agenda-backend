import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipossolicitanteDto } from './dto/create-tipossolicitante.dto';
import { UpdateTipossolicitanteDto } from './dto/update-tipossolicitante.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TipossolicitantesService {
  constructor(private prisma: PrismaService) {}
  async create(createTipossolicitanteDto: CreateTipossolicitanteDto) {
    try {
      const { NomeDoTipo } = createTipossolicitanteDto;
      await this.prisma.tiposolicitante.create({
        data: {
          nomedotipo: NomeDoTipo,
        },
      });
      if (!NomeDoTipo)
        throw new NotFoundException(
          'Nome do tipo de solicitante não pode ser vazio',
        );
      return {
        message: `Tipo de solicitante com nome:${NomeDoTipo} criado com sucesso`,
        status: 201,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return {
            message: 'Nome do tipo de solicitante já existe',
            status: 400,
          };
        }
        return {
          message: 'Ocorreu um erro ao criar o tipo de solicitante',
          status: 500,
        };
      }
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const tiposSolicitantes = await this.prisma.tiposolicitante.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const TotalRecords = await this.prisma.tiposolicitante.count();
      if (!tiposSolicitantes)
        return {
          message: 'Nenhum tipo de solicitante encontrado',
          status: 404,
        };
      return {
        Result: tiposSolicitantes,
        TotalRecords,
        page,
        perPage,
        status: 200,
      };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao listar os tipos de solicitantes',
        status: 500,
      };
    }
  }

  async findOne(id: number) {
    try {
      const tipoSolicitante = await this.prisma.tiposolicitante.findUnique({
        where: { id: id },
      });
      if (!tipoSolicitante)
        return {
          message: `Tipo de solicitante com id:${id} não encontrado`,
          status: 404,
        };
      return { tipoSolicitante, status: 200 };
    } catch (err) {
      return {
        message: `Ocorreu um erro ao listar o tipo de solicitante com id:${id}`,
        status: 500,
      };
    }
  }

  async update(
    id: number,
    updateTipossolicitanteDto: UpdateTipossolicitanteDto,
  ) {
    try {
      const { NomeDoTipo } = updateTipossolicitanteDto;
      await this.prisma.tiposolicitante.update({
        where: { id: id },
        data: {
          nomedotipo: NomeDoTipo,
          updatedat: new Date(),
        },
      });
      if (!NomeDoTipo)
        throw new NotFoundException(
          `Tipo de solicitante com id:${id} não encontrado`,
        );
      return {
        message: `Tipo de solicitante com id:${id} atualizado com sucesso`,
        status: 200,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return {
            message: 'Nome do tipo de solicitante já existe',
            status: 400,
          };
        }
        return {
          message: 'Ocorreu um erro ao atualizar o tipo de solicitante',
          status: 500,
        };
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.tiposolicitante.delete({
        where: { id: id },
      });
      return {
        message: `Tipo de solicitante com id:${id} deletado com sucesso`,
        status: 200,
      };
    } catch (err) {
      return {
        message: `Ocorreu um erro ao deletar o tipo de solicitante com id:${id}`,
        status: 500,
      };
    }
  }
}
