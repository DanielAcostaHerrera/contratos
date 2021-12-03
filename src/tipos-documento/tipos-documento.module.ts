import { Module } from '@nestjs/common';
import { TiposDocumentoService } from './tipos-documento.service';
import { TiposDocumentoResolver } from './tipos-documento.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposDocumento } from 'src/models/entities/TiposDocumento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    TiposDocumento
  ])],
  providers: [TiposDocumentoResolver, TiposDocumentoService]
})
export class TiposDocumentoModule {}
