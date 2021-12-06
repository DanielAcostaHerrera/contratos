import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { NegociacionResumenService } from './negociacion-resumen.service';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';

@Resolver(() => NegociacionResumen)
export class NegociacionResumenResolver {
  constructor(private readonly negociacionResumenService: NegociacionResumenService) {}

  @Mutation(() => NegociacionResumen)
  createNegociacionResumen(@Args('createNegociacionResumenInput') createNegociacionResumenInput: CreateNegociacionResumenInput) {
    return this.negociacionResumenService.save(createNegociacionResumenInput);
  }

  @Query(() => [NegociacionResumen])
  findAllNegociacionResumen() {
    return this.negociacionResumenService.findAll();
  }

  @Query(() => NegociacionResumen)
  findOneNegociacionResumen(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionResumenService.findOne(id);
  }

  @Mutation(() => NegociacionResumen)
  removeNegociacionResumen(@Args('id', { type: () => Int }) id: number) {
    return this.negociacionResumenService.remove(id);
  }

  @ResolveField(() => GruposDeCompras, {nullable: true})
  grupos(@Parent() gruposDeCompras: GruposDeCompras) {
    return this.negociacionResumenService.getGrupo(gruposDeCompras.idGrupo);
  }

  @ResolveField(() => Monedas, {nullable: true})
  monedas(@Parent() monedas: Monedas) {
    return this.negociacionResumenService.getMoneda(monedas.idMoneda);
  }

  @ResolveField(() => TiposDeCompras, {nullable: true})
  tiposDeCompras(@Parent() tiposDeCompras: TiposDeCompras) {
    return this.negociacionResumenService.getTipoCompra(tiposDeCompras.idTipoCompras);
  }
}
