import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(Email: string, Senha: string) {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { email: Email },
      });
      if (!usuario) return { message: 'Usuario não encontrado', status: 404 };
      const isMatch = await bcrypt.compare(Senha, usuario.senha);
      if (!isMatch) return { message: 'Senha incorreta', status: 400 };
      const token = jwt.sign({ id: usuario.id }, 'secret', {
        expiresIn: '1d',
      });
      return { token, message: 'Login realizado com sucesso', status: 200 };
    } catch (err) {
      return {
        message: err.message,
        status: 500,
      };
    }
  }
}
