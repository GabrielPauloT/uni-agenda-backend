import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { Nome, Email, Senha } = createUsuarioDto;
      await this.prisma.usuario.create({
        data: {
          nome: Nome,
          email: Email,
          senha: Senha,
        },
      });
      if (!Nome)
        throw new NotFoundException('Nome do usuario não pode ser vazio');
      return {
        message: `Usuario com nome:${Nome} criado com sucesso`,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return { message: 'Nome do usuario já existe', status: 400 };
        }
        return {
          message: 'Ocorreu um erro ao criar o usuario',
          status: 500,
        };
      }
    }
  }

  async findAll(page: number, perPage: number) {
    try {
      const usuarios = await this.prisma.usuario.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const total = await this.prisma.usuario.count();
      if (!usuarios)
        return { message: 'Nenhum usuario encontrado', status: 404 };
      return { usuarios, total, page, perPage, status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao listar os usuarios',
        status: 500,
      };
    }
  }

  async findOne(id: number) {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: id },
      });
      if (!usuario)
        return {
          message: `Usuario com id: ${id} não encontrado`,
          status: 404,
        };
      return { usuario, status: 200 };
    } catch (err) {
      return {
        message: 'Ocorreu um erro ao listar o usuario',
        status: 500,
      };
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { Nome, Email, Senha } = updateUsuarioDto;
    await this.prisma.usuario.update({
      where: { id: id },
      data: {
        nome: Nome,
        email: Email,
        senha: Senha,
        updatedat: new Date(),
      },
    });
    if (!Nome)
      throw new NotFoundException(`Usuario com id: ${id} não encontrado`);
    return { message: `Usuario com o id: ${id} atualizado com sucesso` };
  }

  async remove(id: number) {
    await this.prisma.usuario.delete({
      where: { id },
    });
    if (!id) throw new NotFoundException('Usuario não encontrado');
    return { message: `Usuario com o id: ${id} deletado com sucesso` };
  }
}
