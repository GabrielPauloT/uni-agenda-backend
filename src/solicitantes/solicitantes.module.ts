import { Module } from '@nestjs/common';
import { SolicitantesService } from './solicitantes.service';
import { SolicitantesController } from './solicitantes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SolicitantesController],
  providers: [SolicitantesService],
  imports: [PrismaModule],
})
export class SolicitantesModule {}
