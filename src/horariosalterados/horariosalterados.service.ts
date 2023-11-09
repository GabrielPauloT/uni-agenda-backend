import { Injectable } from '@nestjs/common';
import { CreateHorariosalteradoDto } from './dto/create-horariosalterado.dto';
// import { UpdateHorariosalteradoDto } from './dto/update-horariosalterado.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HorariosalteradosService {
  constructor(private prisma: PrismaService) {}
  async upsert(createHorariosalteradoDto: CreateHorariosalteradoDto) {
    const { IdHorarioAlterado, IdAgendamento, data, horafinal, horainicial } =
      createHorariosalteradoDto;
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id: IdAgendamento },
    });
    return await this.prisma.horariosalterados.upsert({
      create: {
        data,
        horainicial,
        horafinal,
        idagendamento: agendamento.id,
      },
      update: {
        horainicial,
        horafinal,
      },
      where: {
        id: IdHorarioAlterado,
      },
    });
  }

  async findAll() {
    return await await this.prisma.horariosalterados.findMany({});
  }

  // async findOne(id: number) {
  //   return await `This action returns a #${id} horariosalterado`;
  // }

  // async update(
  //   id: number,
  //   updateHorariosalteradoDto: UpdateHorariosalteradoDto,
  // ) {
  //   return await `This action updates a #${id} horariosalterado`;
  // }

  // async remove(id: number) {
  //   return await `This action removes a #${id} horariosalterado`;
  // }
}
