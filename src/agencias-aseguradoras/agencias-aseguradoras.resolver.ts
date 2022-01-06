import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AgenciasAseguradoras } from 'src/modelsNomgen/entities/AgenciasAseguradoras.entity';
import { AgenciasAseguradorasService } from './agencias-aseguradoras.service';

@Resolver(() => AgenciasAseguradoras)
export class AgenciasAseguradorasResolver {
  constructor(private readonly agenciasAseguradorasService: AgenciasAseguradorasService) {}

  @Query(() => [AgenciasAseguradoras])
  findAllAgenciasAseguradoras() {
    return this.agenciasAseguradorasService.findAll();
  }

  @Query(() => AgenciasAseguradoras)
  findOneAgenciasAseguradoras(@Args('id', { type: () => Int }) id: number) {
    return this.agenciasAseguradorasService.findOne(id);
  }
}
