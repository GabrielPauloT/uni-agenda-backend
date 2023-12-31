import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RelatorioPdfService } from './relatoriopdf.service';

@Controller('pdf')
@ApiTags('Relatório PDF')
export class RelatorioPdfController {
  constructor(private readonly relatorioService: RelatorioPdfService) {}

  @Get(':periodo')
  @ApiOperation({ summary: 'Gera um relatório em PDF' })
  async generatePdf(@Param('periodo') periodo: Date, @Res() res: Response) {
    const pdfBuffer = await this.relatorioService.generatePdf(periodo);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=relatorio.pdf`);
    res.send(pdfBuffer);
  }
}
