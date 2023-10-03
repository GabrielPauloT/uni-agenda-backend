import { Module } from '@nestjs/common';
import { FaltasService } from './faltas.service';
import { FaltasController } from './faltas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FaltasController],
  providers: [FaltasService],
  imports: [PrismaModule],
})
export class FaltasModule {}
