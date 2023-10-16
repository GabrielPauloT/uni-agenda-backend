import { Injectable } from '@nestjs/common';
import { CreateSolicitanteDto } from './dto/create-solicitante.dto';
import { UpdateSolicitanteDto } from './dto/update-solicitante.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SolicitantesService {
  constructor(private prisma: PrismaService) {}
  async create(createSolicitanteDto: CreateSolicitanteDto) {
    if (
      !createSolicitanteDto.NomeSolicitante ||
      !createSolicitanteDto.NomeSolicitante ||
      !createSolicitanteDto.IdTipoSolicitante
    ) {
      return { message: 'Campos obrigatórios faltando', StatusCode: 400 };
    }
    const tipoSolicitanteData = await this.prisma.tiposolicitante.findUnique({
      where: { id: createSolicitanteDto.IdTipoSolicitante },
    });
    if (!tipoSolicitanteData)
      return { message: 'Tipo de solicitante não encontrado', StatusCode: 404 };
    try {
      await this.prisma.solicitante.create({
        data: {
          nome: createSolicitanteDto.NomeSolicitante,
          email: createSolicitanteDto.EmailSolicitante,
          idtiposolicitante: tipoSolicitanteData.id,
        },
      });
      return { message: 'Solicitante criado com sucesso', StatusCode: 201 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Nome do solicitante já existe', StatusCode: 400 };
        }
        return {
          Message: err.message,
          StatusCode: 500,
        };
      }
    }
  }

  async findAll(page: number, perPage: number, nome?: string) {
    try {
      const solicitantes = await this.prisma.solicitante.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where: {
          nome: {
            contains: nome,
            mode: 'insensitive',
          },
        },
      });
      const TotalRecords = await this.prisma.solicitante.count();
      if (!solicitantes)
        return { message: 'Nenhum solicitante encontrado', StatusCode: 404 };
      return {
        Result: solicitantes,
        TotalRecords,
        page,
        perPage,
        StatusCode: 200,
      };
    } catch (err) {
      return {
        Message: err.message,
        StatusCode: 500,
      };
    }
  }

  async findAllByNomeSolicitante(nome: string, page: number, perPage: number) {
    try {
      const solicitantes = await this.prisma.solicitante.findMany({
        where: {
          tiposolicitante: {
            nomedotipo: nome,
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
      });
      if (!solicitantes)
        return { message: 'Nenhum solicitante encontrado', StatusCode: 404 };
      const TotalRecords = await this.prisma.solicitante.count({
        where: {
          tiposolicitante: {
            nomedotipo: nome,
          },
        },
      });
      return {
        Result: solicitantes,
        TotalRecords,
        page,
        perPage,
        StatusCode: 200,
      };
    } catch (err) {
      return {
        Message: err.message,
        StatusCode: 500,
      };
    }
  }

  async findOne(id: number) {
    try {
      const solicitante = await this.prisma.solicitante.findUnique({
        where: { id: id },
      });
      return { solicitante, StatusCode: 200 };
    } catch (err) {
      return {
        Message: err.message,
        StatusCode: 500,
      };
    }
  }

  async update(id: number, updateSolicitanteDto: UpdateSolicitanteDto) {
    const tipoSolicitanteData = await this.prisma.tiposolicitante.findUnique({
      where: { id: updateSolicitanteDto.IdTipoSolicitante },
    });
    try {
      await this.prisma.solicitante.update({
        where: { id: id },
        data: {
          nome: updateSolicitanteDto.NomeSolicitante,
          email: updateSolicitanteDto.EmailSolicitante,
          idtiposolicitante: tipoSolicitanteData.id,
        },
      });
      return { message: 'Solicitante atualizado com sucesso', StatusCode: 200 };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Nome do solicitante já existe', StatusCode: 400 };
        }
        return {
          Message: err.message,
          StatusCode: 500,
        };
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.solicitante.delete({ where: { id: id } });
      return { message: 'Solicitante deletado com sucesso', StatusCode: 200 };
    } catch (err) {
      return {
        Message: err.message,
        StatusCode: 500,
      };
    }
  }
}
