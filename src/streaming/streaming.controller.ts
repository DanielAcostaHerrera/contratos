import { Controller, Get, StreamableFile,Response } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('streaming')
export class StreamingController {

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

    
}


