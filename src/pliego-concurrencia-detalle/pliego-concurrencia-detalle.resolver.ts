import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PliegoConcurrenciaDetalleService } from './pliego-concurrencia-detalle.service';
import { CreatePliegoConcurrenciaDetalleInput } from './dto/create-pliego-concurrencia-detalle.input';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
import { PliegoConcurrenciaResumen } from 'src/models/entities/PliegoConcurrenciaResumen.entity';
import { Embalajes } from 'src/models/entities/Embalajes.entity';

@Resolver(() => PliegoConcurrenciaDetalle)
export class PliegoConcurrenciaDetalleResolver {
  constructor(private readonly pliegoConcurrenciaDetalleService: PliegoConcurrenciaDetalleService) {}

  @Mutation(() => PliegoConcurrenciaDetalle)
  createPliegoConcurrenciaDetalle(@Args('createPliegoConcurrenciaDetalleInput') createPliegoConcurrenciaDetalleInput: CreatePliegoConcurrenciaDetalleInput) {
    return this.pliegoConcurrenciaDetalleService.save(createPliegoConcurrenciaDetalleInput);
  }

  @Query(() => [PliegoConcurrenciaDetalle])
  findAllPliegoConcurrenciaDetalle() {
    return this.pliegoConcurrenciaDetalleService.findAll();
  }

  @Query(() => PliegoConcurrenciaDetalle)
  findOnePliegoConcurrenciaDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaDetalleService.findOne(id);
  }

  @Mutation(() => PliegoConcurrenciaDetalle)
  removePliegoConcurrenciaDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.pliegoConcurrenciaDetalleService.remove(id);
  }

  @Mutation(() => [PliegoConcurrenciaDetalle])
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
}
