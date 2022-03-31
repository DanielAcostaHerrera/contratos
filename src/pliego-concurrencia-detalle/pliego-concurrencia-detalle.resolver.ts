import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PliegoConcurrenciaDetalleService } from './pliego-concurrencia-detalle.service';
import { CreatePliegoConcurrenciaDetalleInput } from './dto/create-pliego-concurrencia-detalle.input';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { Embalajes } from 'src/models/entities/Embalajes.entity';
import { UnidadMedida } from 'src/modelsMercurio/entities/UnidadMedida.entity';
import { Especificos } from 'src/modelsMercurio/entities/Especificos.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => PliegoConcurrenciaDetalle)
export class PliegoConcurrenciaDetalleResolver {
  constructor(private readonly pliegoConcurrenciaDetalleService: PliegoConcurrenciaDetalleService) {}

  @Mutation(() => PliegoConcurrenciaDetalle)
  @UseGuards(new AuthGuard())
  createPliegoConcurrenciaDetalle(@Args('createPliegoConcurrenciaDetalleInput') createPliegoConcurrenciaDetalleInput: CreatePliegoConcurrenciaDetalleInput) {
    return this.pliegoConcurrenciaDetalleService.save(createPliegoConcurrenciaDetalleInput);
  }

  @Query(() => [PliegoConcurrenciaDetalle])
  @UseGuards(new AuthGuard())
  findAllPliegoConcurrenciaDetalle() {
    return this.pliegoConcurrenciaDetalleService.findAll();
  }

  @Query(() => PliegoConcurrenciaDetalle)
  @UseGuards(new AuthGuard())
  findOnePliegoConcurrenciaDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaDetalleService.findOne(id);
  }

  @Mutation(() => PliegoConcurrenciaDetalle)
  @UseGuards(new AuthGuard())
  removePliegoConcurrenciaDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaDetalleService.remove(id);
  }

  @Mutation(() => [PliegoConcurrenciaDetalle])
  @UseGuards(new AuthGuard())
  removeSeveralPliegoConcurrenciaDetalle(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.pliegoConcurrenciaDetalleService.removeSeveral(id);
  }

  @ResolveField(() => PliegoConcurrenciaResumen, {nullable: true})
  pliegoResumen(@Parent() pliegoConcurrenciaDetalle: PliegoConcurrenciaDetalle): Promise<PliegoConcurrenciaResumen> {
    return this.pliegoConcurrenciaDetalleService.getPliegoConcurrenciaResumen(pliegoConcurrenciaDetalle.idPliegoResumen);
  }

  @ResolveField(() => Embalajes, {nullable: true})
  embalaje(@Parent() pliegoConcurrenciaDetalle: PliegoConcurrenciaDetalle): Promise<Embalajes> {
    return this.pliegoConcurrenciaDetalleService.getEmbalaje(pliegoConcurrenciaDetalle.idEmbalaje);
  }

  @ResolveField(() => UnidadMedida, {nullable: true})
  unidadMedida(@Parent() pliegoConcurrenciaDetalle: PliegoConcurrenciaDetalle): Promise<UnidadMedida> {
    return this.pliegoConcurrenciaDetalleService.getUnidadMedida(pliegoConcurrenciaDetalle.idUnidadMedida);
  }

  @ResolveField(() => Especificos, {nullable: true})
  especifico(@Parent() pliegoConcurrenciaDetalle: PliegoConcurrenciaDetalle): Promise<Especificos> {
    return this.pliegoConcurrenciaDetalleService.getEspecifico(pliegoConcurrenciaDetalle.idEspecifico);
  }
}
