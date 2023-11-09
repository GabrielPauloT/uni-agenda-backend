import { Module } from '@nestjs/common';
import { HorariosalteradosService } from './horariosalterados.service';
import { HorariosalteradosController } from './horariosalterados.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [HorariosalteradosController],
  providers: [HorariosalteradosService],
  imports: [PrismaModule],
})
export class HorariosalteradosModule {}
