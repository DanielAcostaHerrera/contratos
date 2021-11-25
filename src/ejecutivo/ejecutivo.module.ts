import { Module } from '@nestjs/common';
import { EjecutivoService } from './ejecutivo.service';
import { EjecutivoResolver } from './ejecutivo.resolver';

@Module({
  providers: [EjecutivoResolver, EjecutivoService]
})
export class EjecutivoModule {}
