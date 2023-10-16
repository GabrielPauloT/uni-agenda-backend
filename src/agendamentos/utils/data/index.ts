import { randomUUID } from 'crypto';
import * as moment from 'moment-timezone';

const _TOTALDIASEMANA_ = 7;

export function pegarDatasEntrePeriodos(
  dataInicial: Date,
  dataFinal: Date,
  diasSemana: number[],
) {
  const agendamentos = [];
  let dataIterada = moment(dataInicial).tz('America/Sao_Paulo').utc();

  const diaAtual = moment(dataInicial).tz('America/Sao_Paulo').utc().day();
  do {
    for (const diaSemana of diasSemana) {
      const diferencaDia = diaSemana - diaAtual;
      const outroDia = moment(dataIterada)
        .tz('America/Sao_Paulo')
        .utc()
        .add(diferencaDia, 'day');

      if (
        outroDia < moment(dataInicial).tz('America/Sao_Paulo').utc() ||
        outroDia > moment(dataFinal).tz('America/Sao_Paulo').utc()
      ) {
        continue;
      }

      agendamentos.push({
        id: randomUUID(),
        data: outroDia.format('YYYY-MM-DD'),
      });
    }
    dataIterada = dataIterada.add(_TOTALDIASEMANA_, 'day');
  } while (dataIterada.isSameOrBefore(dataFinal));
  return agendamentos;
}
