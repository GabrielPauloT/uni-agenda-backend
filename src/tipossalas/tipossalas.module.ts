import { Module } from '@nestjs/common';
import { TipossalasService } from './tipossalas.service';
import { TipossalasController } from './tipossalas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TipossalasController],
  providers: [TipossalasService],
  imports: [PrismaModule],
})
export class TipossalasModule {}
