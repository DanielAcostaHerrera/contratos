import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { NegociacionResumenService } from './negociacion-resumen.service';
import { CreateNegociacionResumenInput } from './dto/create-negociacion-resumen.input';
import { NegociacionResumen } from 'src/models/entities/NegociacionResumen.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { TiposDeCompras } from 'src/models/entities/TiposDeCompras.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';

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

  @Mutation(() => [NegociacionResumen])
  removeSeveralNegociacionResumen(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.negociacionResumenService.removeSeveral(id);
  }

  @ResolveField(() => GruposDeCompras, {nullable: true})
  grupos(@Parent() negociacionResumen: NegociacionResumen): Promise<GruposDeCompras> {
    return this.negociacionResumenService.getGrupo(negociacionResumen.idGrupo);
  }

  @ResolveField(() => Monedas, {nullable: true})
  monedas(@Parent() negociacionResumen: NegociacionResumen): Promise<Monedas> {
    return this.negociacionResumenService.getMoneda(negociacionResumen.idMoneda);
  }

  @ResolveField(() => TiposDeCompras, {nullable: true})
  tiposDeCompras(@Parent() negociacionResumen: NegociacionResumen): Promise<TiposDeCompras> {
    return this.negociacionResumenService.getTipoCompra(negociacionResumen.idTipoCompras);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() negociacionResumen: NegociacionResumen): Promise<Proveedores> {
    return this.negociacionResumenService.getProveedor(negociacionResumen.idProveedor);
  }
}
