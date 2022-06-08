import { Controller, Get, StreamableFile,Response } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('streaming')
export class StreamingController {

    @Get('base-general')
    getFileCustomizedResponse(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'bg.docx'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="bg.docx',
    })
    return new StreamableFile(file);
  }
    
}


