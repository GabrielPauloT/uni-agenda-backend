import { Module } from '@nestjs/common';
import { RecorrenciasService } from './recorrencias.service';
import { RecorrenciasController } from './recorrencias.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RecorrenciasController],
  providers: [RecorrenciasService],
  imports: [PrismaModule],
})
export class RecorrenciasModule {}
