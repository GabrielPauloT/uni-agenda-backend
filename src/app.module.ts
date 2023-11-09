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
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { FaltasModule } from './faltas/faltas.module';
import { AuthModule } from './auth/auth.module';
import { RelatorioPdfModule } from './RelatorioPdf/relatoriopdf.module';
import { HorariosalteradosModule } from './horariosalterados/horariosalterados.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    TipossalasModule,
    SalasModule,
    TipossolicitantesModule,
    SolicitantesModule,
    AgendamentosModule,
    FaltasModule,
    AuthModule,
    RelatorioPdfModule,
    HorariosalteradosModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class AppModule {}
