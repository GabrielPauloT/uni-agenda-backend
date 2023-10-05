import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RelatorioPdfController } from './relatoriopdf.controller';
import { RelatorioPdfService } from './relatoriopdf.service';

@Module({
  controllers: [RelatorioPdfController],
  providers: [RelatorioPdfService],
  imports: [PrismaModule],
})
export class RelatorioPdfModule {}
