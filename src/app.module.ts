import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { TipossalasModule } from './tipossalas/tipossalas.module';
import { SalasModule } from './salas/salas.module';
import { TipossolicitantesModule } from './tipossolicitantes/tipossolicitantes.module';
import { SolicitantesModule } from './solicitantes/solicitantes.module';
import { RecorrenciasModule } from './recorrencias/recorrencias.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';

@Module({
  imports: [PrismaModule, UsuariosModule, TipossalasModule, SalasModule, TipossolicitantesModule, SolicitantesModule, RecorrenciasModule, AgendamentosModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class AppModule {}
