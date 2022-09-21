import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PliegoConcurrenciaDetalleService } from './pliego-concurrencia-detalle.service';
import { CreatePliegoConcurrenciaDetalleInput } from './dto/create-pliego-concurrencia-detalle.input';
import { PliegoConcurrenciaDetalle } from 'src/models/entities/PliegoConcurrenciaDetalle.entity';
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
}
