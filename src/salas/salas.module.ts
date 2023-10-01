import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SalasController],
  providers: [SalasService],
  imports: [PrismaModule],
})
export class SalasModule {}
