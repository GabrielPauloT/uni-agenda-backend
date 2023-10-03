import { Module } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { AgendamentosController } from './agendamentos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AgendamentosController],
  providers: [AgendamentosService],
  imports: [PrismaModule],
})
export class AgendamentosModule {}
