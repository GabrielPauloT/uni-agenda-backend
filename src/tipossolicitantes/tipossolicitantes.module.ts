import { Module } from '@nestjs/common';
import { TipossolicitantesService } from './tipossolicitantes.service';
import { TipossolicitantesController } from './tipossolicitantes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TipossolicitantesController],
  providers: [TipossolicitantesService],
  imports: [PrismaModule],
})
export class TipossolicitantesModule {}
