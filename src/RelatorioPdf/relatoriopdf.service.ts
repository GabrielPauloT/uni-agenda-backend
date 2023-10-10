import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelatorioPdfService {
  constructor(private prisma: PrismaService) {}
  async generatePdf(periodo: Date): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const falta = await this.prisma.falta.findMany({
      where: {
        data: { gte: periodo },
      },
      include: {
        agendamento: {
          include: {
            solicitante: true,
          },
        },
      },
    });

    let tableContent =
      '<table style="width: 100%; border-collapse: collapse;">';
    tableContent += '<tr>';
    tableContent +=
      '<th style="border: 1px solid #000; padding: 10px; text-align: center; font-size: 18px;">Nome do Professor</th>';
    tableContent +=
      '<th style="border: 1px solid #000; padding: 10px; text-align: center; font-size: 18px;">Data da Falta</th>';
    tableContent += '</tr>';

    for (let i = 0; i < falta.length; i++) {
      tableContent += '<tr>';
      tableContent += `<td style="border: 1px solid #000; padding: 10px; text-align: center; font-size: 16px;">${falta[i].agendamento.solicitante.nome}</td>`;
      tableContent += `<td style="border: 1px solid #000; padding: 10px; text-align: center; font-size: 16px;">
        ${falta[i].data.toLocaleDateString()}
      </td>`;
      tableContent += '</tr>';
    }

    tableContent += '</table>';

    const content = `
      <div>
        <div style="text-align: center; margin-bottom: 50px;">
          <h1 style="font-size: 24px;">Relatório de Faltas</h1>
          <p style="font-size: 18px; margin-top: 10px; color: #666;">
            Gerado em: ${new Date().toLocaleDateString()}
          </p>
        </div>
        ${tableContent}
      </div>
    `;

    await page.setContent(content);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return pdfBuffer;
  }
}
