import { CodigosParaLaVentaService } from 'src/codigos-para-la-venta/codigos-para-la-venta.service';
import { Controller, Get, StreamableFile, Response, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { CodigosParaLaVenta } from 'src/modelsMercurio/entities/CodigosParaLaVenta.entity';
import { ReferenciasService } from 'src/referencias/referencias.service';
import { Referencias } from 'src/modelsMercurio/entities/Referencias.entity';
import { ImportExcel } from './importExcel';


@Controller('streaming')
export class StreamingController {
  constructor(private readonly referenciasService: ReferenciasService) { }

  @Get('base-general-internacional')
  getFileBGInternacional(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'bgInternacional.docx'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="bg.docx',
    })
    return new StreamableFile(file);
  }

  @Get('base-general-nacional')
  getFileBGNacional(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'bgNacional.docx'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="bg.docx',
    })
    return new StreamableFile(file);
  }

  @Get('base-general-excepcional')
  getFileBGExcepcional(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'bgExcepcional.docx'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="bg.docx',
    })
    return new StreamableFile(file);
  }

  @Get('base-general-plaza')
  getFileBGPlaza(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'bgPlaza.docx'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="bg.docx',
    })
    return new StreamableFile(file);
  }

  @Get('proformas')
  getFileProformas(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'proformas.docx'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="bg.docx',
    });
    return new StreamableFile(file);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, idProveedor: number): Promise<Referencias[]> {
    const ExcelJS = require('exceljs');
    let listaCodigos: ImportExcel[] = []
    const workbook = new ExcelJS.Workbook();
    try {
      let result = await workbook.xlsx.load(file.buffer)
      const sheet = result.getWorksheet("Hoja1")

      for (let i = 2; i < sheet.rowCount; i++) {
        let importExcel: ImportExcel = new ImportExcel()
        importExcel.codigo = await sheet.getRow(i).getCell(1).value
        importExcel.precio = await sheet.getRow(i).getCell(2).value
        listaCodigos.push(importExcel)
      }
    }
    catch (err) { 
      console.log(err) };

    let result = await this.referenciasService.findByListaCodigos(listaCodigos,idProveedor)

    return result
  }
}
