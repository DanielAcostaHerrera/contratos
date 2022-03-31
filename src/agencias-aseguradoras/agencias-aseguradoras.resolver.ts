import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { AgenciasAseguradoras } from 'src/modelsNomgen/entities/AgenciasAseguradoras.entity';
import { AgenciasAseguradorasService } from './agencias-aseguradoras.service';

@Resolver(() => AgenciasAseguradoras)
export class AgenciasAseguradorasResolver {
  constructor(private readonly agenciasAseguradorasService: AgenciasAseguradorasService) {}

  @Query(() => [AgenciasAseguradoras])
  @UseGuards(new AuthGuard())
  findAllAgenciasAseguradoras() {
    return this.agenciasAseguradorasService.findAll();
  }

  @Query(() => AgenciasAseguradoras)
  @UseGuards(new AuthGuard())
  findOneAgenciasAseguradoras(@Args('id', { type: () => Int }) id: number) {
    return this.agenciasAseguradorasService.findOne(id);
  }
}
