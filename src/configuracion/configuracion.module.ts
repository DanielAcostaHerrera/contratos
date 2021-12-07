import { Module } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { ConfiguracionResolver } from './configuracion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuracion } from 'src/models/entities/Configuracion.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Configuracion]
  )],
  providers: [ConfiguracionResolver, ConfiguracionService],
  exports: [ConfiguracionService]
})
export class ConfiguracionModule {}
