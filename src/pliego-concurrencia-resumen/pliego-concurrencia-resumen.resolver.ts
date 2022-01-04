import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PliegoConcurrenciaResumenService } from './pliego-concurrencia-resumen.service';
import { CreatePliegoConcurrenciaResumanInput } from './dto/create-pliego-concurrencia-resuman.input';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { PliegoConcurrencia } from 'src/models/entities/PliegoConcurrencia.entity';
import { Monedas } from 'src/models/entities/Monedas.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { FormasPago } from 'src/models/entities/FormasPago.entity';
import { FormasEntrega } from 'src/models/entities/FormasEntrega.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { TiposContenedor } from 'src/models/entities/TiposContenedor.entity';

@Resolver(() => PliegoConcurrenciaResumen)
export class PliegoConcurrenciaResumenResolver {
  constructor(private readonly pliegoConcurrenciaResumenService: PliegoConcurrenciaResumenService) {}

  @Mutation(() => PliegoConcurrenciaResumen)
  createPliegoConcurrenciaResuman(@Args('createPliegoConcurrenciaResumanInput') createPliegoConcurrenciaResumanInput: CreatePliegoConcurrenciaResumanInput) {
    return this.pliegoConcurrenciaResumenService.save(createPliegoConcurrenciaResumanInput);
  }

  @Query(() => [PliegoConcurrenciaResumen])
  findAllPliegoConcurrenciaResumen() {
    return this.pliegoConcurrenciaResumenService.findAll();
  }

  @Query(() => PliegoConcurrenciaResumen)
  findOnePliegoConcurrenciaResumen(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaResumenService.findOne(id);
  }

  @Mutation(() => PliegoConcurrenciaResumen)
  removePliegoConcurrenciaResuman(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaResumenService.remove(id);
  }

  @Mutation(() => [PliegoConcurrenciaResumen])
  removeSeveralPliegoConcurrenciaResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.pliegoConcurrenciaResumenService.removeSeveral(id);
  }

  @ResolveField(() => PliegoConcurrencia, {nullable: true})
  pliegoConcurrencia(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<PliegoConcurrencia> {
    return this.pliegoConcurrenciaResumenService.getPliegoConcurrencia(pliegoConcurrenciaResumen.idPliego);
  }

  @ResolveField(() => Monedas, {nullable: true})
  monedaOferta(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<Monedas> {
    return this.pliegoConcurrenciaResumenService.getMonedaOferta(pliegoConcurrenciaResumen.idMonedaOferta);
  }

  @ResolveField(() => Monedas, {nullable: true})
  monedaPago(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<Monedas> {
    return this.pliegoConcurrenciaResumenService.getMonedaPago(pliegoConcurrenciaResumen.idMonedaPago);
  }

  @ResolveField(() => Monedas, {nullable: true})
  monedaCartaCredito(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<Monedas> {
    return this.pliegoConcurrenciaResumenService.getMonedaCartaCredito(pliegoConcurrenciaResumen.idMonedaCartaCredito);
  }

  @ResolveField(() => Incoterm, {nullable: true})
  incoterm(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<Incoterm> {
    return this.pliegoConcurrenciaResumenService.getIncoterm(pliegoConcurrenciaResumen.idIncoterm);
  }

  @ResolveField(() => FormasPago, {nullable: true})
  formaPago(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<FormasPago> {
    return this.pliegoConcurrenciaResumenService.getFormasPago(pliegoConcurrenciaResumen.idFormaPago);
  }

  @ResolveField(() => FormasEntrega, {nullable: true})
  formaEntrega(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<FormasEntrega> {
    return this.pliegoConcurrenciaResumenService.getFormasEntrega(pliegoConcurrenciaResumen.idFormaEntrega);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoEmbarque(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<Puertos> {
    return this.pliegoConcurrenciaResumenService.getPuertosEmbarque(pliegoConcurrenciaResumen.idPuertoEmbarque);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoDestino(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<Puertos> {
    return this.pliegoConcurrenciaResumenService.getPuertosDestino(pliegoConcurrenciaResumen.idPuertoDestino);
  }

  @ResolveField(() => TiposContenedor, {nullable: true})
  tipoContenedor(@Parent() pliegoConcurrenciaResumen: PliegoConcurrenciaResumen): Promise<TiposContenedor> {
    return this.pliegoConcurrenciaResumenService.getTiposContenedor(pliegoConcurrenciaResumen.idTipoContenedor);
  }
}
